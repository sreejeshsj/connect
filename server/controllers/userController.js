import bcrypt from "bcrypt";
import UserModel from "../models/user.js";
import { v2 as cloudinary } from "cloudinary";
import createToken from "../utils/token.js";
const register = async (req, res) => {
  try {
    const { name, email, password, bio } = req.body;

    const profilePicture = req.file;
    const user = await UserModel.findOne({ email });
    if (!name || !email || !password || !profilePicture) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (user) {
      return res.json({
        success: false,
        message:
          "Email is Already Exists! Please Login or User Other email create new account",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const profileUpload = await cloudinary.uploader.upload(profilePicture.path);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      bio,
      profilePicture: profileUpload.secure_url,
    });

    res.json({
      success: true,
      message: "New user created successfully",
      token: createToken(newUser._id),
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {};

export { register, login };
