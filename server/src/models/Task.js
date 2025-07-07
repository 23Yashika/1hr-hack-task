
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  target: String,
  dateTime: String,
  roadmap: String, // NEW FIELD
});

export default mongoose.model("Task", taskSchema);


