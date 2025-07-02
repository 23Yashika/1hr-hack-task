import React, { use } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
const Login = () => {
  const navigate = useNavigate();
  const {
    identifier,
    setIdentifier,
    username,
    setUsername,
    password,
    setPassword,
    login,
  } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login();
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10">Login Page</h1>
      <form className="max-w-md mx-auto mt-5" onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="email">
            Email or Username :
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              setUsername(e.target.value); // Assuming you want to set username as well
            }}
            type="text"
            id="email_or_username"
            name="email_or_username"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="password">
            Password:
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          type="submit"
        >
          Login
        </button>
      </form>
      <p className="text-center mt-4">
        Don't have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Register here
        </span>
      </p>
    </div>
  );
};

export default Login;
