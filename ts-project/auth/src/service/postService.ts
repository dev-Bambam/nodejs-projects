import { ValidationError } from "../utils/Errors/Errors";

export async function createPost(title: string, content: string) {
   if (!title || !content) {
      throw new ValidationError([]);
   }
   // Fake DB save for now
   return { id: 1, title, content };
}
