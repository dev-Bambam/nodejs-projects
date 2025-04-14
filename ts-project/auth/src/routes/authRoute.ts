import { Router } from "express";
import { signUp, resendEmailCode } from "../controller/authController";
import reqValidation from "../middleware/validationMW";
import { signUpVal } from "../validator/authValidator";

const authRouter = Router();

authRouter.post('/signup',reqValidation(signUpVal), signUp);
authRouter.post("/resend-verification-code", resendEmailCode);

export default authRouter;