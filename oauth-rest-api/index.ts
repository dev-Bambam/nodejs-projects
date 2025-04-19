import dotenv from "dotenv";
dotenv.config()
import { Request, Response } from "express";
import connectDb from "./src/config/db";
connectDb();

