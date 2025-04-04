import Admin, { AdminDocument } from "../model/admin";
import User, { UserDocument } from "../model/user";
import RevokedToken from "../model/revokedToken";

export const createUser = async (
   data: object,
   type: string
): Promise<AdminDocument | UserDocument> => {
   if (type === "user") return await User.create(data);
   if (type === "admin") return await Admin.create(data);
   throw new Error("Invalid user type");
};

export const getUserByEmail = async (email: string, type: string) => {
   if (type === 'user') return await User.findOne({ email });
   if (type === 'admin') return await Admin.findOne({ email });
   throw new Error('invalid user type')
};
