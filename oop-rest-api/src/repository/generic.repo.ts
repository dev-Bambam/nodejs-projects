import { iDbRepo } from "../interfaces/db.interface";
import mongoose from "mongoose";

class GenericRepo<T extends mongoose.Document> implements iDbRepo<T> {
    constructor(private readonly model: mongoose.Model<T>) { }
    
    async create(data: T): Promise<T> {
        return this.model.create(data)
    }
    async findAll(): Promise<T[]> {
        return this.model.find().exec()
    }
    
}
