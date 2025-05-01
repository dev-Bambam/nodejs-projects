import { IUserDocument } from "../../model/user";
import { BaseUser } from "./BaseUser";

export class User extends BaseUser{
    constructor(user: IUserDocument) {
        super(user)
    }
    getType(): string {
        return 'user'
    }
}