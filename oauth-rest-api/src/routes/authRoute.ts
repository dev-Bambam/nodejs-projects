import express, { Router, Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router: Router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET!;

router.get(
   "/google",
   passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get(
    '/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/' }),
    (req: Request, res: Response) => {
        const user = req.user as any;
        const token = jwt.sign(
           { id: user._id, email: user.email, authProvider: user.authProvider },
           JWT_SECRET,
           { expiresIn: '1h' }
        );
        res.json({token})
    }
)

export default router