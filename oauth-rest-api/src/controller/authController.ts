import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser, IJwtPayload } from '../models/user';

const JWT_SECRET: string = process.env.JWT_SECRET!;

// interfaces

interface ISignupBody{
    email: string,
    password: string,
    displayName?:string
}
interface ILoginBody{
    email: string,
    password:string
}

// Route Handlers
export const googleCallback = (req: Request, res: Response): void => {
    try {
        const user: IUser = req.user as IUser;
        if (!user) res.status(500).json({ error: "?No user found" });
        const token: string = jwt.sign(
            { id: user._id, email: user.email, authProvider: user.authProvider } as IJwtPayload,
            JWT_SECRET,
            {expiresIn: '1h'}
        )
        res.json({token})
    } catch (error) {
        console.error("Google callback error:", error);
        res.status(500).json({
            error: "internal error"
        })
    }
}
// sign up
export const signup = async (req: Request<{}, {}, ISignupBody>, res: Response): Promise<void> => {
    const { email, password, displayName } = req.body;
    if (!email || !password) {
        res.status(400).json({
            error: "email and password required"
        })
    }

    try {
        const existingUser: IUser | null = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: 'Email already exist' });
        }
    } catch (error) {
        
    }
}