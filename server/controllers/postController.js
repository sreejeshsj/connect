import PostModel from "../models/Posts.js";
import { v2 as cloudinary } from "cloudinary";
import UserModel from "../models/user.js";

//create new post
const createNewPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file;
    if (!image) {
      return res.json({
        success: false,
        message: "Please provide image",
      });
    }
    const result = await cloudinary.uploader.upload(image.path);
    const post = await PostModel.create({
      caption,
      image: result.secure_url,
      userId: req.userId,
    });

    res.json({
      success: true,
      message: "Post uploaded successfully",
      post,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message || "Something wrong while creating new post",
    });
  }
};

//edit post
const editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { caption } = req.body;
    const image = req.file;

    const update = {};

    if (caption !== undefined) {
      update.caption = caption;
    }
    if (image) {
      const result = await cloudinary.uploader.upload(image.path);
      update.image = result.secure_url;
    }

    const updatePost = await PostModel.findByIdAndUpdate(
      postId,
      { $set: update },
      { new: true }
    );
    if (updatePost) {
      res.json({
        success: true,
        message: "Post updated successfully",
        updatePost,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message || "Something wrong while updating the post",
    });
  }
};

//like and unlike
const likeAndDislike = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.like.includes(req.userId)) {
      post.like.pull(req.userId);
    } else {
      post.like.push(req.userId);
    }
    await post.save();
    res.json({
      success: true,
      message: "Post liked",
      post,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message || "Something wrong while updating the post",
    });
  }
};

//delete post 
const deletePost = async (req,res)=>{
  try {
    const {postId}=req.params
    const post = await PostModel.findByIdAndDelete(postId)
    res.json({
      success:true,
      message:"Post deleted successfully"
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message || "Something wrong while updating the post",
    });
  }
}

//fetch post of followed users
const fetchFollowedUserPost=async (req,res)=>{
  try {
    const user=await UserModel.findById(req.userId)
    const followingList=user.following
    const post=await PostModel.find({userId:{$in:followingList}}).sort({createdAt:-1}).populate("userId","name profilePicture")
    res.json({
      success:true,
      post
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message || "Something wrong while fetching the post",
    });
  }
}

//fetch all post 
const fetchAll=async (req,res)=>{
  try {
    const post = await PostModel.find()
    res.json({
      success:true,
      count:post.length,
      post
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message || "Something wrong while fetching  the all post",
    });
  }
}

//get post and user details of loggedIn user
const fetchLoggedInUserPost = async (req,res)=>{
  try {
    const post= await PostModel.find({userId:req.userId})

    res.json({
      success:true,
      post
    })
  } catch (error) {
     res.json({
      success: false,
      message: error.message || "Something wrong while fetching  user post",
    });
  }
}

//fetch specific user posts with user details
const fetchSpecificUser = async (req,res)=>{

  try {
    const {userId}=req.body
    const data=await PostModel.find({userId}).populate('userId',"-email -password")
    res.json({
      success:true,
      userData:data
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message || "Something wrong while fetching  user post",
    });
  }
}

export { createNewPost, editPost, likeAndDislike, deletePost, fetchFollowedUserPost, fetchAll, fetchLoggedInUserPost,fetchSpecificUser };
