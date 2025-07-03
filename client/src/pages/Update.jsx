import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useUserData from "../hooks/userData";

const Update = () => {
  const { taskId } = useParams();
  const {
    title,
    setTitle,
    description,
    setDescription,
    target,
    setTarget,
    time,
    setTime,
    updateTask,
    tasks,
    loading,
    error,
  } = useUserData(taskId);

  // 🛠️ Populate form fields once the task is fetched
  useEffect(() => {
    const currentTask = tasks.find((task) => task._id === taskId);
    if (currentTask) {
      setTitle(currentTask.title || "");
      setDescription(currentTask.description || "");
      setTarget(currentTask.target || "");
      setTime(currentTask.dateTime?.slice(0, 16) || ""); // datetime-local expects this format
    }
  }, [tasks, taskId]);

  return (
    <div>
      <h1>Update Task</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateTask(taskId, { title, description, target, dateTime: time });
        }}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Target to achieve"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <input
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full mb-5 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default Update;
