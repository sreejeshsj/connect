import PostModel from "../models/Posts.js";
import { v2 as cloudinary } from "cloudinary";

//create new post
const createNewPost = async (req, res) => {
  try {
    const { caption } = req.body;
    console.log(caption);
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
    console.log(postId)
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

export { createNewPost, editPost, likeAndDislike, deletePost };
