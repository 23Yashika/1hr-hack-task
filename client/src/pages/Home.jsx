import React from "react";
import { useParams } from "react-router-dom";
import useUserData from "../hooks/userData";
import { Link } from "react-router-dom";
const Home = () => {
  const { userId } = useParams();

  const {
    setTitle,
    setDescription,
    setTarget,
    setTime,
    createTask,
    tasks,
    loading,
    error,
    deleteTask,
  } = useUserData(userId);
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mt-10 mb-8 text-blue-700">
        Home Page
      </h1>
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        onSubmit={createTask}
      >
        <div className="mb-4">
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Target to achieve"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <input
            type="datetime-local"
            onChange={(e) => setTime(e.target.value)}
            className="w-full mb-5 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Set Goal
        </button>
      </form>

      <div>
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-700">
          Your Tasks
        </h2>
        <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
          {tasks.length > 0
            ? tasks.map((task) => (
                <div key={task._id} className="mb-4 p-4 border-b">
                  <h3 className="text-lg font-bold">{task.title}</h3>
                  <p>{task.description}</p>
                  <p className="text-sm text-gray-500">Target: {task.target}</p>
                  <p className="text-sm text-gray-500">
                    Time: {new Date(task.dateTime).toLocaleString()}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Link to={`/update/${task._id}/${userId}`}>
                      <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">
                        Update
                      </button>
                    </Link>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      onClick={() => deleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            : !loading && <p className="text-gray-500">No tasks found.</p>}
          {loading && <p>Loading tasks...</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Home;





// import React from "react";
// import { useParams } from "react-router-dom";
// import useUserData from "../hooks/userData";

// const Home = () => {
//   const { userId } = useParams();

//   const {
//     setTitle,
//     setDescription,
//     setTarget,
//     setTime,
//     createTask,
//     tasks,
//     loading,
//     error,
//     generateRoadmap,
//   } = useUserData(userId);

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold text-center mt-10 mb-8 text-blue-700">
//         Home Page
//       </h1>
//       <form
//         className="bg-white p-8 rounded shadow-md w-full max-w-md"
//         onSubmit={createTask}
//       >
//         <input
//           type="text"
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Title"
//           className="mb-4 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <input
//           type="text"
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Description"
//           className="mb-4 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <input
//           type="text"
//           onChange={(e) => setTarget(e.target.value)}
//           placeholder="Target to achieve"
//           className="mb-4 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <input
//           type="datetime-local"
//           onChange={(e) => setTime(e.target.value)}
//           className="mb-5 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           Set Goal
//         </button>
//       </form>

//       <div>
//         <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-700">
//           Your Tasks
//         </h2>
//         <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
//           {tasks.map((task) => (
//             <div key={task._id} className="mb-4 p-4 border-b">
//               <h3 className="text-lg font-bold">{task.title}</h3>
//               <p>{task.description}</p>
//               <p className="text-sm text-gray-500">Target: {task.target}</p>
//               <p className="text-sm text-gray-500">
//                 Time: {new Date(task.dateTime).toLocaleString()}
//               </p>
//               <div className="mt-2">
//                 {task.roadmap ? (
//                   <div className="bg-gray-100 p-2 rounded text-sm whitespace-pre-wrap">
//                     {task.roadmap}
//                   </div>
//                 ) : (
//                   <button
//                     onClick={() => generateRoadmap(task)}
//                     className="mt-2 px-4 py-1 text-white bg-green-600 rounded hover:bg-green-700"
//                   >
//                     Generate Roadmap
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//           {loading && <p>Loading tasks...</p>}
//           {error && <p className="text-red-500">{error}</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

