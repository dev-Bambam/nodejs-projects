import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User, { IUser } from "../models/user";

passport.use(
   new GoogleStrategy(
      {
         clientID: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
         callbackURL: "http://localhost:3000/auth/google/callback",
      },
      async (_accessToken, _refreshToken, profile, done) => {
         try {
            let user: IUser | null = await User.findOne({ googleId: profile.id });
            if (!user) {
               user = await User.findOne({ email: profile.emails![0].value });
               if (user) {
                  user.googleId = profile.id;
                  user.authProvider = "google";
                  await user.save();
               } else {
                  user = await User.create({
                     googleId: profile.id,
                     email: profile.emails![0].value,
                     displayName: profile.displayName,
                     authProvider: "google",
                  });
               }
            }
            done(null, user);
         } catch (error) {
            console.error("OAuth Error:", error); // Log the error
            done(error);
         }
      }
   )
);

// JWT strategy
interface JwtPayload {
   id: string;
}

// interface JwtStrategyOptions {
//    jwtFromRequest: (req: any) => string | null;
//    secretOrKeyProvider: string;
// }

passport.use(
   new JwtStrategy(
      {
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         secretOrKey: process.env.JWT_SECRET!
      },
      async (payload: JwtPayload, done: (error: any, user?: IUser | false) => void) => {
         try {
            const user: IUser | null = await User.findById(payload.id);
            if (!user) return done(null, false);
            done(null, user);
         } catch (error) {
            done(error);
         }
      }
   )
);