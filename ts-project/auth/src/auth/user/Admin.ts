import { IAdminDocument } from "../../model/admin";
import { BaseUser } from "./BaseUser";

export class Admin extends BaseUser{
    constructor(admin: IAdminDocument) {
        super(admin)
    }
    getType(): string {
        return 'admin'
    }
}