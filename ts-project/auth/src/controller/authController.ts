import { Request, Response } from "express";
import { doHash, doCompare, doHmac } from "../utils/hashing";
import { signUpVal } from "../validator/authValidator";
import { createUser, getUserByEmail } from "../service/authService";
// Magic numbers
const SALT_VALUE = 10;

export const signUp = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, password, email, type } = req.body;
        await signUpVal.validateAsync({ firstName, lastName, password, email, type });
        // check if user already register
        const user = await getUserByEmail(email, type);
        if (user) {
            return res.status(401).json({
                status: 'fail',
                message: 'user already registered'
            })
        }
        // hash password and create
        const hashedPassword = await doHash(password, SALT_VALUE);

        
    } catch (error) {
        
    }
}