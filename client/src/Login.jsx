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
    <div className="bg-slate-950 h-screen w-screen relative">
      <div className="absolute h-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-white rounded-xl shadow-lg">
        <p className="text-4xl font-mono font-bold text-blue-950 pb-6">Login</p>
        <input
          className="w-full h-1/6 mb-4 py-2 px-2 border-blue-950 border-2 rounded-lg font-mono"
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full h-1/6 mb-4 py-2 px-2 border-blue-950 border-2 rounded-lg font-mono"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-950 text-white font-mono mt-8 mb-4 py-2 px-2 rounded-xl w-full"
          onClick={handleLogin}
        >
          Login
        </button>
        <pre>{message}</pre>
      </div>
    </div>
  );
}
