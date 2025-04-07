import { Router } from "express";
import { signUp } from "../controller/authController";

const authRouter = Router();

authRouter.post('/signup', signUp);

export default authRouter;