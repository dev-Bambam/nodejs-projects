import express from "express";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { Server } from "socket.io";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, "public")));

const expServer = app.listen(3000, () => {
   console.log("server running at http://localhost:3000");
});
const io = new Server(expServer);
io.on("connection", (socket) => {
   socket.on("message", (chat) => {
      io.emit("message", `${socket.id.substring(0, 5)}: ${chat}`);
   });
});
