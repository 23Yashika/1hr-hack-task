// import { useState, useEffect } from "react";
// import axios from "axios";

// const useUserData = (userId) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [target, setTarget] = useState("");
//   const [time, setTime] = useState("");

//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5002/api/tasks/${userId}`
//         );
//         setTasks(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTasks();
//   }, [userId]);

//   const createTask = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5002/api/tasks",
//         { userId, title, description, target, dateTime: time },
//         { headers: { "Content-Type": "application/json" } }
//       );
//       setTasks([...tasks, response.data]);
//       setTitle("");
//       setDescription("");
//       setTarget("");
//       setTime("");
//     } catch (err) {
//       console.error("Error creating task:", err);
//     }
//   };

//   const updateTask = async (id, updatedData) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:5002/api/tasks/${id}`,
//         updatedData,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
//     } catch (err) {
//       console.error("Error updating task:", err);
//     }
//   };

//   const deleteTask = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5002/api/tasks/${id}`);
//       setTasks(tasks.filter((task) => task._id !== id));
//     } catch (err) {
//       console.error("Error deleting task:", err);
//     }
//   };

//   return {
//     title,
//     setTitle,
//     description,
//     setDescription,
//     target,
//     setTarget,
//     time,
//     setTime,
//     tasks,
//     loading,
//     error,
//     createTask,
//     updateTask,
//     deleteTask,
//   };
// };

// export default useUserData;



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
      await fetchTasks(); // ye bhadwi line is important to refresh tasks after update
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
      await fetchTasks(); // isme bhi wahi bhadwi line hai which refreshes tasks after deletion
    } catch (err) {
      setError("Error deleting task: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const generateRoadmap = async (task) => {
    try {
      const response = await axios.post("http://localhost:5002/api/tasks/roadmap", {
        taskId: task._id,
        title: task.title,
        description: task.description,
        target: task.target,
        dateTime: task.dateTime,
      });

      const updatedTasks = tasks.map((t) =>
        t._id === task._id ? { ...t, roadmap: response.data.roadmap } : t
      );
      setTasks(updatedTasks);
    } catch (err) {
      console.error("Error generating roadmap:", err);
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
    generateRoadmap,
  };
};

export default useUserData;