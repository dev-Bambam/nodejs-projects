import { Request, Response } from "express";
import { createPost } from "../service/postService";

export const createNewPost = async (req: Request, res: Response) => {
   let { title, content } = req.body;
   const post = await createPost(title, content); // Might throw
   res.status(201).json({ status: "success", data: post });
};
