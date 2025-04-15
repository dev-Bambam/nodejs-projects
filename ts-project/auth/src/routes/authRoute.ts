import { Router } from "express";
import { signUp, resendEmailCode, login, logOut, forgotPassword, resetPassword, generateRefreshToken } from "../controller/authController";
import reqValidation from "../middleware/validationMW";
import { signUpVal } from "../validator/authValidator";

const authRouter = Router();

authRouter.post('/signup',reqValidation(signUpVal), signUp);
authRouter.post("/resend-verification-code", resendEmailCode);
authRouter.post("/login", login);
authRouter.post("/logout", logOut);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/get-access-token", generateRefreshToken);


export default authRouter;