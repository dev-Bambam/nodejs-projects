import { Request, Response } from "express";
import { doHash, doCompare, doHmac } from "../utils/hashing";
import { signUpVal } from "../validator/authValidator";
import { createUser, getUserByEmail } from "../service/authService";
import sendEmail from "../utils/sendEmail";
import logger from "../utils/logger";

// Magic numbers
const SALT_VALUE = 10;
const CODE_EXPIRY = 60 * 60 * 1000; // 1 hour

export const signUp = async (req: Request, res: Response): Promise<void> => {
   try {
      await signUpVal.validateAsync(req.body);
      const { firstName, lastName, password, email, type } = req.body;
      // check if user already register
      const existingUser = await getUserByEmail(email, type);
      if (existingUser) {
         throw new Error("user already exist");
      }
      // hash password and create
      const hashedPassword = await doHash(password, SALT_VALUE);
      const user = {
         firstName,
         lastName,
         password: hashedPassword,
         email,
      };
      const newUser = await createUser(user, type);
      // generate verification code and send to email
      const verificationCode: string = Math.floor(1e5 + Math.random() * 9e5).toString();
      const info: boolean = await sendEmail(newUser.email, "Email verification", verificationCode);
      // hashed the verification code and store it in the database
      const hashedVerificationCode = doHmac(verificationCode, process.env.HMAC_KEY);
      newUser.emailVerificationCode = hashedVerificationCode;
      newUser.emailCodeValidation = Date.now() + CODE_EXPIRY;
      await newUser.save();
      logger.info(`new user registered succesfully and email sent to ${newUser.email}`);

      res.status(201).json({
         status: "success",
         message: "user registered successfully",
      });
   } catch (error: unknown) {
      let statusCode = 500;
      let message = "Something is wrong, we are working on it";

      // Narrow the type of error
      if (typeof error === "object" && error !== null && "details" in error) {
         const err = error as { details: { message: string }[] };
         statusCode = 400;
         message = err.details[0].message;
      } else if (error instanceof Error) {
         statusCode = 400;
         message = error.message;
      }
      logger.error(`error: ${error}, user's email: ${req.body.email}`);

      res.status(statusCode).json({ status: "fail", message });
   }
};
