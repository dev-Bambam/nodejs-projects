import { IUserDocument } from "../../model/user";
import { IAdminDocument } from "../../model/admin";
import { IUser } from "./IUser";
import { Types } from "mongoose";
import { doHash, doHmac } from "../../utils/hashing";

// magic number
const CODE_EXPIRY = 25 * 60 * 1000; //25mins
const SALT_VALUE = 10;

export abstract class BaseUser implements IUser {
   constructor(protected user: IUserDocument | IAdminDocument) {}
   getId(): Types.ObjectId {
      return this.user.id;
   }
   getCode(): string | undefined {
      return this.user.code;
   }
   getEmail(): string {
      return this.user.email;
   }
   getCodeValidation(): number | undefined {
      return this.user.codeValidation;
   }
   getPassword(): string | undefined {
      return this.user.password;
   }
   getRefreshToken(): string | undefined {
      return this.user.refreshToken;
   }
   abstract getType(): string;
   isVerified(): boolean {
      return this.user.verified;
   }
   setVerificationCode(code: string): void {
      this.user.code = code;
      this.user.codeValidation = Date.now() + CODE_EXPIRY;
   }
   async setPassword(password: string): Promise<void> {
      this.user.password = await doHash(password, SALT_VALUE);
   }
   setRefreshToken(token: string): void {
      this.user.refreshToken = doHmac(token, process.env.HMAC_KEY);
   }
   async save(): Promise<void> {
      await this.user.save();
   }
   clearVerificationCode(): void {
      this.user.verified = true;
      this.user.code = undefined;
      this.user.codeValidation = undefined;
   }
}
