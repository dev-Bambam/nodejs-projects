import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User, { IUser } from "../models/user";


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL : 'auth/google/calback'
        },
        async (_accessToken, _refreshToken, profile, done) => {
            try {
                let user: IUser | null = await User.findOne({ googleId: profile.id });
                if (!user) {
                    user = await User.findOne({ email: profile.emails![0].value });
                    if (user) {
                        user.googleId = profile.id;
                        user.authProvider = 'google';
                        await user.save()
                    } else {
                        user = await User.create({
                            googleId: profile.id,
                            email: profile.emails![0].value,
                        })
                    }
                }
            } catch (error) {
                
            }
        }
    )
)