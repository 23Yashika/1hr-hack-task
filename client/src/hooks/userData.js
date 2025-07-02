import { useState, useEffect } from "react";
import axios from "axios";

const useUserData = (userId) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [time, setTime] = useState("");

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5002/api/tasks/${userId}`
        );
        setTasks(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [userId]);

  const createTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5002/api/tasks",
        { userId, title, description, target, dateTime: time },
        { headers: { "Content-Type": "application/json" } }
      );
      setTasks([...tasks, response.data]);
      setTitle("");
      setDescription("");
      setTarget("");
      setTime("");
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const updateTask = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:5002/api/tasks/${id}`,
        updatedData,
        { headers: { "Content-Type": "application/json" } }
      );
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5002/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    target,
    setTarget,
    time,
    setTime,
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
  };
};

export default useUserData;
