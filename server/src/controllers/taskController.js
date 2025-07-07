import Task from "../models/Task.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const createTask = async (req, res) => {
  try {
    const { userId, title, description, target, dateTime } = req.body;
    const task = new Task({ userId, title, description, target, dateTime });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { userId } = req.params;
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const generateRoadmap = async (req, res) => {
  const { taskId, title, description, target, dateTime } = req.body;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
I have a task: 
Title: ${title}
Description: ${description}
Target: ${target}
Deadline: ${dateTime}

Please break down this task into a clear, actionable roadmap with step-by-step suggestions to complete it efficiently and please use simple words that every one can understand and make it that the user understand and also apply the suggestion to complete the task but make sure that it should be of 50-60 words only.
`;

    const result = await model.generateContent(prompt);
    const roadmap = result.response.text();

    const task = await Task.findByIdAndUpdate(
      taskId,
      { roadmap },
      { new: true }
    );

    res.status(200).json({ roadmap });
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({ error: "Failed to generate roadmap" });
  }
};
