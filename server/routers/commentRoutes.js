import express from "express";
import userAuth from "../middlewares/userAuth.js";
import {
  addComment,
  fetchAllComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/comment/:postId", userAuth, addComment);
router.post("/fetch-comment", userAuth, fetchAllComment);

export default router;
