import express from "express";
import userAuth from "../middlewares/userAuth.js";
import { createNewPost, deletePost, editPost, likeAndDislike } from "../controllers/postController.js";
import upload from "../config/multer.js";
const router = express.Router();

router.post("/create", userAuth, upload.single("image"), createNewPost);
router.post("/update/:postId", userAuth, upload.single("image"), editPost);
router.post('/likeToggle/:postId',userAuth,likeAndDislike),
router.post('/delete/:postId',userAuth,deletePost)
export default router;
