import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAuth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
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
          name,
          username,
          email,
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
        { identifier: email || username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      setUser(res.data.user);
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
    name,
    setName,
    email,
    setEmail,
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
