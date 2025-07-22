import CommentModel from '../models/Comments.js'
import PostModel from '../models/Posts.js'

//add a comment
const addComment=async (req,res)=>{
 try {
    const {postId}=req.params
    const {comment}=req.body
    if(!comment){
        return res.json({
            success:false,
            message: "Please enter a comment"
        })
    }

    const post = await PostModel.findById(postId)
    if(!post){
        return res.json({
            success:false,
            messgae:"Post not found"
        })
    }
    const newComment=await CommentModel.create({
        postId,
        userId:req.userId,
        comment

    })

    post.comment.push(newComment._id)
    await post.save()
    res.json({
        success:true,
        messgae:"Commet add successfully",
        newComment,
        post
    })
     
 } catch (error) {
    res.json({
      success: false,
      message: error.message || "Something wrong while commenting",
    });
 }
}

export {
    addComment
}