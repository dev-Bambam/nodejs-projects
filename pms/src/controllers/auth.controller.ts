import { Request, Response } from "express"
export const signup = async (req: Request, res: Response) => {
    const { fullname, username, email, password } = req.body;

    // const existingUser;
}