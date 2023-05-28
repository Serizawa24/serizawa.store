import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    avatar: {
      type: String,
      default: "avatar-template",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;