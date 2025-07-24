import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongoDb.js";
import connectCloundinary from "./config/cloudinary.js";
import UserRouter from "./routers/userRoutes.js";
import postRouter from "./routers/postRoutes.js";
import commentRouter from "./routers/commentRoutes.js";
const app = express();

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
//port setup
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server started at port : ", port);
});
