import express from "express";
import { register } from "../controllers/userController.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/register", upload.single("profilePicture"), register);

export default router;
