import iUser from "../interfaces/user.interface";
import User from "../models/user.model";
import GenericRepo from "./generic.repo";

class UserRepo extends GenericRepo<iUser>{
    constructor() {
        super(User)
    }

    async findByEmail(email: string): Promise<iUser | null>{
        return User.findOne({ email });
    }
    async findByName(name: string): Promise<iUser | null>{
        return User.findOne({name})
    }
}

export default UserRepo