import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    caption: { type: String, default: "" },
    image: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
  },
  { timestamps: true }
);

const PostModel = mongoose.models.Posts || mongoose.model("Posts", PostSchema);

export default PostModel;
