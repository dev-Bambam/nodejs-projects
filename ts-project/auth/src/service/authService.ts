import Admin, { AdminDocument } from "../model/admin";
import User, { UserDocument } from "../model/user";
import { InvalidCodeError, InvalidError, NotFoundError } from "../utils/Errors/Errors";
import RevokedToken from "../model/revokedToken";
import { doHmac, doHmacCompare, doHash } from "../utils/hashing";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Magic Number
const CODE_EXPIRY = 25 * 60 * 1000; // 25 minutes
const ACCESS_TOKEN_EXP = "15m"; // 15 minutes
const REFRESH_TOKEN_EXP = "1d"; // 1hr
const TOKEN_EXP = 24 * 60 * 60 * 1000; //1day
const SALT_VALUE = 10;

// Types declaration
type userId = mongoose.Types.ObjectId | unknown;
type userType = AdminDocument | UserDocument;

export const createUser = async (data: object, type: string): Promise<userType> => {
   if (type === "user") return await User.create(data);
   if (type === "admin") return await Admin.create(data);
   throw new InvalidError();
};

export const getUserByEmail = async (email: string, type: string) => {
   if (type === "user") {
      return await User.findOne({ email }).select(
         "+password code codeValidation refreshedToken verified "
      );
   }

   if (type === "admin") {
      return await Admin.findOne({ email }).select(
         "+password code codeValidation refreshedToken verified "
      );
   }
   throw new InvalidError();
};

export const getVerificationCode = () => Math.floor(1e5 + Math.random() * 9e5).toString();

export const hashAndSaveCode = async (user: userType, code: string) => {
   const hashedVerificationCode = doHmac(code, process.env.HMAC_KEY);
   user.code = hashedVerificationCode;
   user.codeValidation = Date.now() + CODE_EXPIRY;
   await user.save();
};
export const compareAndSave = async (user: userType, code: string, password?: string) => {
   const valid = doHmacCompare(code, user.code);
   console.log("I got here");
   if (!valid) throw new InvalidCodeError();
   console.log("I am suppose to be logged but...");
   if (user.codeValidation && Date.now() > user.codeValidation) throw new InvalidCodeError();
   user.verified = true;
   user.code = undefined;
   user.codeValidation = undefined;
   if (password) user.password = await doHash(password, SALT_VALUE);
   await user.save();
};

export const getAccessToken = (userId: userId, type: string): string => {
   if (!process.env.JWT_ACCESS_TOKEN) throw new Error("env not set");
   return jwt.sign({ sub: userId, type: type }, process.env.JWT_ACCESS_TOKEN, {
      expiresIn: ACCESS_TOKEN_EXP,
   });
};

export const getRefreshToken = (userId: userId, type: string): string => {
   if (!process.env.JWT_REFRESH_TOKEN) throw new Error("env not set");
   return jwt.sign({ sub: userId, type: type }, process.env.JWT_REFRESH_TOKEN, {
      expiresIn: REFRESH_TOKEN_EXP,
   });
};

export const getUSerByRefreshToken = async (refreshToken: string, type: string) => {
   if (!process.env.JWT_REFRESH_TOKEN) throw new Error("env not set");
   const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
   console.log(decoded.sub)
   if (type === "user") {
      return await User.findById(decoded.sub).select("+refreshToken");
   }
   if (type === "admin") {
      return await Admin.findById(decoded.sub).select("+refreshToken");
   }
};

export const verifyUser = (user: userType, refreshToken: string) => {
   return user.refreshToken === doHmac(refreshToken, process.env.HMAC_KEY);
};

export const blackListRefreshToken = async (refreshToken: string, user: userType) => {
   await RevokedToken.create({
      token: refreshToken,
      userId: user._id,
      expiresAt: new Date(Date.now() + TOKEN_EXP),
   });
};

export const checkForRevokedToken = async (refreshToken: string) => {
   const revokedToken = await RevokedToken.findOne({ token: refreshToken });
   if (revokedToken) throw new InvalidCodeError();
};

export const verifyActiveTokenMatch = (user: userType, refreshToken: string) => {
   console.log(`input:${doHmac(refreshToken, process.env.HMAC_KEY)}, exist:${user.refreshToken}`);

   if (!(user.refreshToken === doHmac(refreshToken, process.env.HMAC_KEY)))
      throw new InvalidCodeError();

   return true;
};

export const hashAndSaveToken = async (user: userType, token: string) => {
   const hashedToken = doHmac(token, process.env.HMAC_KEY);
   user.refreshToken = hashedToken;
   await user.save();
};
