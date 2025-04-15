import { Request, Response } from "express";
import { doHash, doCompare } from "../utils/hashing";
import {
   createUser,
   getUserByEmail,
   getVerificationCode,
   hashAndSaveCode,
   compareAndSave,
   getAccessToken,
   getRefreshToken,
   getUSerByRefreshToken,
   verifyUser,
   blackListRefreshToken,
   checkForRevokedToken,
   verifyActiveTokenMatch,
   hashAndSaveToken
} from "../service/authService";
import {
   NotFoundError,
   UserExistError,
   UserVerifiedError,
   UserNotVerifiedError,
   PasswordError,
   InvalidCodeError,
} from "../utils/Errors/Errors";
import sendEmail from "../utils/sendEmail";
import logger from "../utils/logger";

// Magic numbers
const SALT_VALUE = 10;
const ACCESS_TOKEN_EXP = 15 * 60 * 1000; // 15 minutes in milliseconds
const REFRESH_TOKEN_EXP = 24 * 60 * 60 * 1000; //24hrs

export const signUp = async (req: Request, res: Response): Promise<void> => {
   const { firstName, lastName, password, email, type } = req.body;

   const existingUser = await getUserByEmail(email, type);
   if (existingUser) throw new UserExistError();

   const hashedPassword = await doHash(password, SALT_VALUE);
   const user = { firstName, lastName, password: hashedPassword, email };
   const newUser = await createUser(user, type);

   const verificationCode = getVerificationCode();
   await sendEmail(newUser.email, "Email verification", verificationCode);
   await hashAndSaveCode(newUser, verificationCode);

   logger.info(`new user registered succesfully and email sent to ${newUser.email}`);

   res.status(201).json({
      status: "success",
      message: "user registered successfully",
   });
};
export const resendEmailCode = async (req: Request, res: Response): Promise<void> => {
   const { email, type } = req.body;

   const user = await getUserByEmail(email, type);
   if (!user) throw new NotFoundError();
   if (user.verified) throw new UserVerifiedError();

   const code = getVerificationCode();
   await sendEmail(email, "Email Verification", code);
   await hashAndSaveCode(user, code);

   logger.info(`new verification code sent to ${user.email}`);

   res.status(200).json({
      status: "success",
      message: "verification code sent",
   });
};

export const codeVerification = async (req: Request, res: Response): Promise<void> => {
   const { email, code, type } = req.body;

   const user = await getUserByEmail(email, type);
   if (!user) throw new NotFoundError();
   if (user.verified) throw new UserVerifiedError();

   await compareAndSave(user, code);

   res.status(200).json({
      status: "success",
      message: "code verified successfully",
   });
};

export const login = async (req: Request, res: Response): Promise<void> => {
   const { email, password, type } = req.body;

   const user = await getUserByEmail(email, type);
   if (!user) throw new NotFoundError();
   if (!user.verified) throw new UserNotVerifiedError();
   if (!doCompare(password, user.password)) throw new PasswordError();

   const accessToken = getAccessToken(user._id, type);
   const refreshToken = getRefreshToken(user._id, type);
   await hashAndSaveToken(user, refreshToken)

   res.cookie("accessToken", accessToken, {
      maxAge: ACCESS_TOKEN_EXP,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
   });
   res.cookie("refreshToken", refreshToken, {
      maxAge: REFRESH_TOKEN_EXP,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
   });
   res.status(200).json({
      status: "success",
      message: "user logged in",
   });
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
   const { email, type } = req.body;

   const user = await getUserByEmail(email, type);
   if (!user) throw new NotFoundError();
   if (!user.verified) throw new UserNotVerifiedError();

   const code = getVerificationCode();
   await sendEmail(email, "Password Reset", code);
   await hashAndSaveCode(user, code);

   res.status(200).json({
      status: "success",
      message: "check your email to get password reset code",
   });
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
   const { email, type, code, password } = req.body;

   const user = await getUserByEmail(email, type);
   if (!user) throw new NotFoundError();
   if (!user.verified) throw new UserNotVerifiedError();

   await compareAndSave(user, code, password);

   res.status(200).json({
      status: "success",
      message: "password reset successfully",
   });
};

export const logOut = async (req: Request, res: Response): Promise<void> => {
   const { refreshToken, type } = req.body || req.cookies;

   const user = await getUSerByRefreshToken(refreshToken, type);
   if (!user) throw new NotFoundError();
   if (user && user.refreshToken) {
      if (!verifyUser(user, refreshToken)) throw new InvalidCodeError();
      await blackListRefreshToken(user.refreshToken, user);
   }

   res.clearCookie("accessToken");
   res.clearCookie("refreshToken");

   res.status(200).json({
      status: "success",
      message: "user logged out",
   });
};

export const generateRefreshToken = async (req: Request, res: Response): Promise<void> => {
   const { refreshToken, type } = req.body ?? req.cookies;

   const user = await getUSerByRefreshToken(refreshToken, type);
   if (!user) throw new NotFoundError();
   if (user) {
      await checkForRevokedToken(refreshToken);
      verifyActiveTokenMatch(user, refreshToken);

      const newAccessToken = getAccessToken(user._id, type);
      const newRefreshToken = getRefreshToken(user._id, type);

      await blackListRefreshToken(refreshToken, user);
      await hashAndSaveToken(user, newRefreshToken);

      res.cookie(
         "accessToken",
         newAccessToken,
         {
            maxAge: ACCESS_TOKEN_EXP,
            httpOnly: true,
            secure: true,
            sameSite: 'lax'
         }
      );
      res.cookie(
         'refreshToken',
         newRefreshToken,
         {
            maxAge: REFRESH_TOKEN_EXP,
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
         }
      );
      res.status(200).json({
         status: 'success',
         message: "new access token generated"
      })
   }
   throw new Error('something went wrong')
}