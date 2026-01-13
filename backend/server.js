import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import router from "./Routes/routes.js";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";


import http from "http";
import { Server } from "socket.io";

dotenv.config();

const api = express();
api.set('trust proxy', 1); // Trust first proxy (Render/Netlify)
const server = http.createServer(api);

const allowedOrigins = [
    "http://localhost:5173",
    'https://gigflows.netlify.app',
    process.env.CLIENT_URL
].filter(Boolean);

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        credentials: true
    }
});




export const userSocketMap = {}; // userId -> socketId


io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }




    // Handle disconnect
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        if (userId && userSocketMap[userId]) {
            delete userSocketMap[userId];
        }
    });
});



api.use(cors({ origin: allowedOrigins, credentials: true }));

api.use(express.json());
api.use(cookieParser());

api.use(helmet({ "crossOriginResourcePolicy": "cross-origin" }));

const file = fileURLToPath(import.meta.url);

const dir = path.dirname(file);

api.use(express.static(path.join(dir, "uploads")));


// Pass io to routes via middleware (optional, or just import io in routes if separate file)
// For this setup, since we need to use io in routes.js, we might need a different approach 
// or pass it. BUT routes.js is imported. 
// A better way for ES modules is exporting `io` and importing it in routes.

api.use("/api/auth", router);

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export { io };