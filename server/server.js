// server/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./src/routes/authroutes.js";
import taskroutes from "./src/routes/taskroutes.js";
import fileUpload from "express-fileupload";
import connectDB from "./src/config/db.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
  res.send("Welcome to Task Manager API");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskroutes);

connectDB().then(() => {
  app.listen(process.env.PORT, () => console.log("Server running..."));
});



