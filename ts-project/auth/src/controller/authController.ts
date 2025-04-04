import { Request, Response } from "express";
import { signUpVal } from "../validator/authValidator";
import { createUser } from "../service/authService";


export const signUp = async (req: Request, res: Response) => {
    const { firstName, lastName, password, email, type } = req.body;
    await signUpVal.validateAsync({ firstName, lastName, password, email, type });
}