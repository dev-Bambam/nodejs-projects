import { IUser } from "./IUser";
import User  from "../../model/user";
import Admin from "../../model/admin";
import { User } from "./User";

export class UserFactory{
    static async createUser(userData: object, type: string): Promise<IUser> {
        if (type === 'user') {
            const user = await User.create(userData);
            return new User(userData)
        }
    }
}