import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Server } from "socket.io";
import { addUser, removeUser, getUser } from "./utils/users.js";
import userRoutes from "./routes/user.js";
import roomRoutes from "./routes/room.js";
import { getUsers } from "./controllers/user.js";
import messageRoutes from "./routes/message.js"; 
import path from 'path';
import { fileURLToPath } from 'url';

// Define __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use("/api/messages", messageRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/users", userRoutes);
app.use("/rooms", roomRoutes);
app.get("/getUsers",getUsers)
app.get("/", (req, res) => {
  res.send("Hello to VIA API");
});

const CONNECTION_URL = process.env.CONNECTION_URL;
// const CONNECTION_URL = 'mongodb+srv://majayyadav1357:<8aBk8F4NYzywFLQl>@cluster0-linkup.7dpvt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0-LinkUp';


const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const server = app.listen(PORT, () =>
      console.log(`Server running on port: ${PORT}`)
    );
    const io = new Server(server, {
      cookie: false,
      cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      socket.on("join", ({ userId, name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, userId, name, room });

        if (error) return callback(error);

        socket.join(user.room);

        callback();
      });

      // socket.on("sendMessage", (message, callback) => {
      //   const user = getUser(socket.id);

      //   io.to(user.room).emit("message", {
      //     senderId: user.userId,
      //     sender: user.name,
      //     message: message,
      //     timestamp: new Date(),
      //   });

      //   callback();
      // });
      socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id);
        
        // Handle both regular text messages and file messages
        const messageData = typeof message === 'object' && message.isFile 
          ? message  // Already formatted file message from upload endpoint
          : {
              senderId: user.userId,
              sender: user.name,
              message: message,
              timestamp: new Date(),
            };
      
        io.to(user.room).emit("message", messageData);
        callback();
      });

      socket.on("typing", () => {
        socket.broadcast.emit("typing");
      });

      socket.on("stop-typing", () => {
        socket.broadcast.emit("stop-typing");
      });

      socket.on("call", () => {
        socket.broadcast.emit("call");
      });

      socket.on("disconnect", () => {
        removeUser(socket.id);
      });
    });
  })
  .catch((error) => console.log(error.message));
  