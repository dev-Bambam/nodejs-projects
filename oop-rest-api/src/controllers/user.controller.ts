import { Request, Response } from "express";
import iUser from "../interfaces/user.interface";
import UserService from "../services/user.service";

class UserController{
    private readonly service: UserService
    
    constructor() {
        this.service = new UserService();
    }
    async create(req: Request, res: Response) {
        console.log('request got here')
        try {
            const data: iUser = req.body;
            const user = await this.service.create(data)
            res.status(201).json(user)
        } catch (error:unknown) {
            throw new Error(error as string)
        }
    }
    async findAll(_req: Request, res: Response) {
        try {
            const users = await this.service.findAll()
            res.status(200).json(users)
        } catch (error) {
            throw new Error(error as string)
        }
    }
}

export default UserController