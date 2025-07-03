import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useUserData = (userId) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [time, setTime] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5002/api/tasks/${userId}`
      );
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchTasks();
    // eslint-disable-next-line
  }, [userId]);

  const createTask = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      setError(null);
    } catch (err) {
      setError("Error creating task: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id, updatedData) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5002/api/tasks/${id}`,
        updatedData,
        { headers: { "Content-Type": "application/json" } }
      );
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      setTitle("");
      setDescription("");
      setTarget("");
      setTime("");
      setError(null);
      await fetchTasks();
      navigate(`/home/${userId}`);
    } catch (err) {
      setError("Error updating task: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5002/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      setError(null);
      await fetchTasks();
    } catch (err) {
      setError("Error deleting task: " + err.message);
    } finally {
      setLoading(false);
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