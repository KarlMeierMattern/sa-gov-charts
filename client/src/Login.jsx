"use client";

import axios from "axios";
axios.defaults.withCredentials = true; // Global setting
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const baseUrl =
    import.meta.env.VITE_ENV === "development"
      ? import.meta.env.VITE_DEV_BASE_URL
      : import.meta.env.VITE_PROD_BASE_URL;

  axios.defaults.baseURL = baseUrl;
  axios.defaults.withCredentials = true; // Send cookies with requests

  const handleLogin = async () => {
    try {
      await axios.post("/login", { username, password }); // JWT is stored in cookie
      setMessage("Logged in successfully!");
      navigate("/"); // Redirect after login
    } catch (error) {
      console.log(error);
      setMessage("Login failed");
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <pre>{message}</pre>
    </>
  );
}
