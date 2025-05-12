import iUser from "../interfaces/user.interface";
import UserRepo from "../repository/user.repo";

class UserService{
    private readonly repo: UserRepo
    
    constructor() {
        this.repo = new UserRepo()
    }
    async create(data: iUser):Promise<iUser>{
        return this.repo.create(data)
    }
    async findAll(): Promise<iUser[]>{
        return this.repo.findAll()
    }
    async findById(id: string): Promise<iUser | null>{
        return this.repo.findById(id)
    }
    async update(id: string, data:iUser): Promise<iUser | null>{
        return this.repo.update(id, data)
    }
    async delete(id: string): Promise<iUser | null>{
        return this.repo.delete(id)
    }
    async findByEmail(email: string): Promise<iUser | null>{
        return this.repo.findByEmail(email)
    }
    async findByName(name: string): Promise<iUser | null>{
        return this.repo.findByName(name)
    }
}

export default UserService