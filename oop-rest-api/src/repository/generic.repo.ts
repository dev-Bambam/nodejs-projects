import { iDbRepo } from "../interfaces/db.interface";
import mongoose from "mongoose";

class GenericRepo<T extends mongoose.Document> implements iDbRepo<T> {
   constructor(private readonly model: mongoose.Model<T>) {}

   async create(data: T): Promise<T> {
      return this.model.create(data);
   }
   async findAll(): Promise<T[]> {
      return this.model.find().exec();
   }
   async findById(id: string): Promise<T | null> {
      return this.model.findById(id).exec();
   }
   async delete(id: string): Promise<T | null> {
      return this.model.findByIdAndDelete(id).exec();
   }
   async update(id: string, data: T): Promise<T | null> {
      return this.model.findByIdAndUpdate(id).exec();
   }
    async findAllPaginatedWithFilter(
        filter: any,
        page: number,
        limit: number): Promise<T[]> {
        return this.model
            .find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .exec()
        }
}
export default GenericRepo