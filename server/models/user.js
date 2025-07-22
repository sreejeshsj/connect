import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: "" },
  bio: { type: String, default: "" },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
});

const UserModel = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default UserModel;
