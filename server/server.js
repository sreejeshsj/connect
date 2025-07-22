import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongoDb.js";
import connectCloundinary from "./config/cloudinary.js";
import UserRouter from "./routers/userRoutes.js";
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

//port setup
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server started at port : ", port);
});
