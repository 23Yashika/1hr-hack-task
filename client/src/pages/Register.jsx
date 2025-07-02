import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
const Register = () => {
  const navigate = useNavigate();
  const {
    name,
    setName,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    mobile,
    setMobile,
    user,
    error,
    loading,
    register,
  } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form reload
    await register(); // call the register function from the hook
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10">Register Page</h1>
      <form className="max-w-md mx-auto mt-5" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="fullName">
            Full Name:
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="fullName"
            name="fullName"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="username">
            Username:
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            type="text"
            name="username"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="email">
            Email:
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            name="email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="mobile">
            Mobile Number:
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            id="mobile"
            type="text"
            name="mobile"
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
        {/* <div className="mb-4">
          <label className="block text-gray-700" htmlFor="avatar">
            Profile Image / Avatar:
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            id="avatar"
            type="file"
            name="avatar"
            accept="image/*"
          />
        </div> */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
      </form>
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}
      {user && (
        <div className="text-green-500 text-center mt-4">
          Registration successful! Redirecting to login...
        </div>
      )}
      {loading && (
        <div className="text-blue-500 text-center mt-4">Loading...</div>
      )}
      <div className="text-center mt-4">
        Already have an account?{" "}
        <button
          className="text-blue-500 hover:underline"
          onClick={() => navigate("/")}
        >
          Login here
        </button>
      </div>
    </div>
  );
};

export default Register;
