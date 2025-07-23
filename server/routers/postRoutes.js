import express from "express";
import userAuth from "../middlewares/userAuth.js";
import { createNewPost, deletePost, editPost, fetchAll, fetchFollowedUserPost, fetchLoggedInUserPost, likeAndDislike } from "../controllers/postController.js";
import upload from "../config/multer.js";
const router = express.Router();

router.post("/create", userAuth, upload.single("image"), createNewPost);
router.post("/update/:postId", userAuth, upload.single("image"), editPost);
router.post('/likeToggle/:postId',userAuth,likeAndDislike),
router.post('/delete/:postId',userAuth,deletePost),
router.get('/fetch',userAuth,fetchFollowedUserPost),
router.get('/fetch-all',userAuth,fetchAll),
router.get('/fetch-user-post',userAuth,fetchLoggedInUserPost)
export default router;
