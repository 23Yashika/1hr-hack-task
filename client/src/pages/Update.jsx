import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useUserData from "../hooks/userData";

const Update = () => {
  const { taskId, userId } = useParams();
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
  } = useUserData(userId);

  useEffect(() => {
    if (!loading && tasks && tasks.length > 0) {
      const currentTask = tasks.find((task) => task._id === taskId);
      if (currentTask) {
        setTitle(currentTask.title || "");
        setDescription(currentTask.description || "");
        setTarget(currentTask.target || "");
        setTime(currentTask.dateTime?.slice(0, 16) || "");
      }
    }
    // eslint-disable-next-line
  }, [tasks, taskId, loading, setTitle, setDescription, setTarget, setTime]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Update Task</h1>
        {loading && <p className="text-center text-gray-500 mb-4">Loading...</p>}
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateTask(taskId, { title, description, target, dateTime: time });
          }}
        >
          <div className="mb-5">
            <label className="block text-gray-700 mb-2" htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 mb-2" htmlFor="target">Target to achieve</label>
            <input
              id="target"
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Target to achieve"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="datetime">Date & Time</label>
            <input
              id="datetime"
              type="datetime-local"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
            disabled={loading}
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
