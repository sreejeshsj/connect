import express from "express";
import {
  register,
  login,
  getSingleUser,
  updateUserProfile,
  updateProfilePicture,
  follow,
  unFollow,
} from "../controllers/userController.js";
import upload from "../config/multer.js";
import userAuth from "../middlewares/userAuth.js";

const router = express.Router();

router.post("/register", upload.single("profilePicture"), register);
router.post("/login", login);
router.post("/getuser", userAuth, getSingleUser);
router.post("/update", userAuth, updateUserProfile);
router.post(
  "/update-dp",
  userAuth,
  upload.single("profilePicture"),
  updateProfilePicture
);

router.post("/follow", userAuth, follow);
router.post("/unfollow", userAuth, unFollow);
export default router;
