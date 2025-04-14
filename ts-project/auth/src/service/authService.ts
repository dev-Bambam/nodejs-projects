import Admin, { AdminDocument } from "../model/admin";
import User, { UserDocument } from "../model/user";
import { InvalidCodeError, InvalidError, NotFoundError } from "../utils/Errors/Errors";
import RevokedToken from "../model/revokedToken";
import { doHmac, doHmacCompare } from "../utils/hashing";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Magic Number
const CODE_EXPIRY = 5 * 60 * 1000; // 5 minutes
const ACCESS_TOKEN_EXP = "15m"; // 15 minutes
const REFRESH_TOKEN_EXP = "1d"; // 1hr

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
      const user = await User.findOne({ email }).select(
         "password emailVerificationCode emailCodeValidation verified "
      );
      if(!user) throw new NotFoundError()
      return user;
   }

   if (type === "admin") {
      const admin = await Admin.findOne({ email }).select(
         "password emailVerificationCode emailCodeValidation verified "
      );
      if(!admin) throw new NotFoundError()
      return admin;
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
export const compareAndSave = async (user: userType, code: string) => {
   const valid = doHmacCompare(code, user.code);
   if (!valid) throw new InvalidCodeError();
   if (user.codeValidation && Date.now() > user.codeValidation) throw new InvalidCodeError();
   user.verified = true;
   user.code = undefined;
   user.codeValidation = undefined;
   await user.save();
};

export const getAccessToken = (userId: userId, type: string):string => {
   if (!process.env.JWT_ACCESS_TOKEN) throw new Error("env not set");
   return jwt.sign({ sub: userId, type: type }, process.env.JWT_ACCESS_TOKEN, {
      expiresIn: ACCESS_TOKEN_EXP,
   });
};

export const getRefreshToken =  (userId: userId):string => {
   if (!process.env.JWT_REFRESH_TOKEN) throw new Error("env not set");
   return jwt.sign({ sub: userId }, process.env.JWT_REFRESH_TOKEN, {
      expiresIn: REFRESH_TOKEN_EXP,
   });
};
