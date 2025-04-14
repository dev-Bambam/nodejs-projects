import express from "express";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { Server } from "socket.io";
import mongoose from "mongoose";
import Message from "./model/Message.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, "public")));

const expServer = app.listen(3000, () => {
   console.log("server running at http://localhost:3000");
});

// MongoDB Atlas connection string
const mongoURI =
   "mongodb+srv://ayogood18:k9dpSDxAXxMJhfji@cluster0.tkpio.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB Atlas
try {
   await mongoose.connect(mongoURI);
   console.log("Connected to MongoDB Atlas");
} catch (err) {
   console.error("Failed to connect to MongoDB Atlas", err);
   process.exit(1);
}

const io = new Server(expServer);

io.on("connection", async (socket) => {
   // try {
   //    const messages = await Message.find().sort({ timestamp: 1 }).exec();
   //    socket.emit("chat history", messages);
   // } catch (error) {
   //    console.error(error);
   // }

   socket.on('join', (userName) => {
      socket.userName = userName;
      socket.join(userName); //remove this if you don't want to implemet chat room
      io.emit('user joined', userName)
   })
   socket.on("chat message", async (chat) => {
      try {
         // const message = new Message(chat);
         // await message.save();
         io.to(chat.room).emit("chat message", chat);
      } catch (err) {
         console.error(err);
      }
   });

   socket.on("activity", (name) => {
      socket.broadcast.emit("activity", name);
   });

   socket.on("join", (userName) => {
      socket.userName = userName;
      io.emit("user joined", userName);
   });
   socket.on('disconnect', () => {
      io.emit('user left', socket.userName)
   })
});
