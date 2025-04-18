import User from "./../models/user.model.js";
import bcrypt from "bcryptjs";

export const creatUser = async (userData) => {
    const { userName, email, password } = userData;
    
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({
            userName,
            password: hashedPassword,
            email
        });
        await user.save();
        return user.toObject()
    } catch (error) {
        throw new Error(error.message);
    }
}

export const findUserByEmail = async (email) => {
    const user = await User.findOne({email})
    return user ? user : null;
}

export const findUserByUsername = async (userName) => {
    const user = await User.findOne({ userName });
    return user ? user : null
};

export const verifyPassword = async (user, password) => {
    return await bcrypt.compare(password, user.password)
}