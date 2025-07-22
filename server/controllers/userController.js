import bcrypt from "bcrypt";
import UserModel from "../models/user.js";
import { v2 as cloudinary } from "cloudinary";
import createToken from "../utils/token.js";

//user registration
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

//user login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User does not exists",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      return res.json({
        success: true,
        message: "Logged in Successfully",
        token: createToken(user._id),
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//get user based on id
const getSingleUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (user) {
      res.json({
        success: true,
        user,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "jwkej",
    });
  }
};

//update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const update = {};
    if (name !== undefined) {
      update.name = name;
    }
    if (bio !== undefined) {
      update.bio = bio;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.userId,
      { $set: update },
      { new: true }
    );
    res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//update profilePicture
const updateProfilePicture = async (req, res) => {
  try {
    const profilePicture = req.file;
    console.log(profilePicture);
    if (!profilePicture) {
      return res.json({
        success: false,
        message: "Please provide image",
      });
    }
    const result = await cloudinary.uploader.upload(profilePicture.path);
    if (result) {
      const updatedProfile = await UserModel.findByIdAndUpdate(
        req.userId,
        { profilePicture: result.secure_url },
        { new: true }
      );

      res.json({
        success: true,
        message: "dp updated successfully",
        updatedProfile,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

//follow controller
const follow = async (req, res) => {
  try {
    const { targetId } = req.body;

    const loggedInUser = await UserModel.findById(req.userId);
    const targetUser = await UserModel.findById(targetId);

    if (!loggedInUser.following.includes(targetUser._id)) {
      loggedInUser.following.push(targetUser._id);
    }
    if (!targetUser.followers.includes(loggedInUser._id)) {
      targetUser.followers.push(loggedInUser._id);
    }

    await loggedInUser.save();
    await targetUser.save();

    res.json({
      success: true,
      message: "Followed Successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

//unfollow controller
const unFollow = async (req, res) => {
  try {
    const { targetId } = req.body;
    const loggedInUser = await UserModel.findById(req.userId);
    const targetUser = await UserModel.findById(targetId);
    if (loggedInUser.following.includes(targetUser._id)) {
      loggedInUser.following.pull(targetUser._id);
    }
    if (targetUser.followers.includes(loggedInUser._id)) {
      targetUser.followers.pull(loggedInUser._id);
    }

    await loggedInUser.save();
    await targetUser.save();

    res.json({
      success: true,
      message: "UnFollowed Successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export {
  register,
  login,
  getSingleUser,
  updateUserProfile,
  updateProfilePicture,
  follow,
  unFollow,
};
