import express from "express";
import http from 'http'
import {Server} from 'socket.io'
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongoDb.js";
import connectCloundinary from "./config/cloudinary.js";
import UserRouter from "./routers/userRoutes.js";
import postRouter from "./routers/postRoutes.js";
import commentRouter from "./routers/commentRoutes.js";
import setUpChatSocket from './socket/chatSocket.js'
import chatRouter from './routers/chatRoute.js'
const app = express();
const server=http.createServer(app)

const io=new Server(server,{
  cors:{
    origin:"*",
    methods:['GET','POST']
  }
})
//middleware
app.use(express.json());
app.use(cors());

//database connection
connectDB();

//cloudinary setup
connectCloundinary();

//router
app.use("/api/user", UserRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
app.use('/api/chat', chatRouter)
//port setup

setUpChatSocket(io)

const port = process.env.PORT;
server.listen(port, () => {
  console.log("Server started at port : ", port);
});
