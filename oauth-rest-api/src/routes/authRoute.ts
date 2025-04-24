import dotenv from 'dotenv';
dotenv.config()
import express, { Router, Request, Response } from "express";
import passport from "passport";
import bcrypt from 'bcryptjs';
import User, { IUser, IJwtPayload } from 'models/user';
import jwt from "jsonwebtoken";

const router: Router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET!;

// interface



// local Auth routes


// OAuth route
router.get(
   "/google",
   passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get(
   "/google/callback",
   passport.authenticate("google", { session: false, failureRedirect: "/" }),
   (req: Request, res: Response) => {
      try {
         const user = req.user as any;
         if (!user) throw new Error("No user found");
         const token = jwt.sign(
            { id: user._id, email: user.email, authProvider: user.authProvider },
            JWT_SECRET,
            { expiresIn: "1h" }
         );
         res.json({ token });
      } catch (error) {
         console.error("Callback Error:", error);
         res.status(500).json({ error: "Internal Server Error" });
      }
   }
);

export default router