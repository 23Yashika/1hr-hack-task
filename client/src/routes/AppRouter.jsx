import { Routes, Route } from "react-router";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Update from "../pages/Update";
const appRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home/:userId" element={<Home />} />
      <Route path="/update/:taskId" element={<Update />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default appRouter;
