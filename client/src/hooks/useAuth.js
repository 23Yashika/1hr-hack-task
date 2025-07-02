import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAuth = () => {
  const [username, setUsername] = useState("");
  const [identifier, setIdentifier] = useState(""); // for email or username
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5002/api/auth/register",
        {
          name: identifier, // optional: you can keep it as separate name if needed
          username,
          email: identifier,
          mobile,
          password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      setUser(res.data);
      navigate("/");
    } catch (err) {
      const errMsg =
        err.response?.data?.msg ||
        err.response?.data?.error ||
        err.message ||
        "Registration failed";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

 const login = async () => {
  setError(null);
  setLoading(true);
  try {
    const res = await axios.post(
      "http://localhost:5002/api/auth/login",
      { identifier, password },
      { headers: { "Content-Type": "application/json" } }
    );
    setUser(res.data.user); // Optional: only set the user object
    navigate(`/home/${res.data.user._id}`);
  } catch (err) {
    const errMsg =
      err.response?.data?.msg ||
      err.response?.data?.error ||
      err.message ||
      "Login failed";
    setError(errMsg);
  } finally {
    setLoading(false);
  }
};


  return {
    identifier,
    setIdentifier,
    username,
    setUsername,
    password,
    setPassword,
    mobile,
    setMobile,
    user,
    error,
    loading,
    register,
    login,
  };
};

export default useAuth;
