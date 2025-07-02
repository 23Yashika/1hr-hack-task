import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: { type: String, unique: true },
  password: String,
  mobile: String,
  avatar: { type: String, default: "default.png" },
});

export default mongoose.model("User", userSchema);
