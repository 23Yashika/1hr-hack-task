

import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  generateRoadmap,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createTask);
router.get("/:userId", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.post("/roadmap", generateRoadmap); // NEW

export default router;
