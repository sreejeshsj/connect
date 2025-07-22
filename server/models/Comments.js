import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    comment: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

const CommentModel =
  mongoose.models.Comments || mongoose.model("Comments", CommentSchema);
export default CommentModel;
