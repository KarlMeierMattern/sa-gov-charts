import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  // Get base URL based on environment
  const baseUrl =
    import.meta.env.VITE_ENV === "development"
      ? import.meta.env.VITE_DEV_BASE_URL
      : import.meta.env.VITE_PROD_BASE_URL;

  axios.defaults.baseURL = baseUrl;

  const handleLogin = async () => {
    try {
      const response = await axios.post("/login", {
        username,
        password,
      });
      setToken(response.data.token);
      setMessage("Logged in successfully!");
    } catch (error) {
      console.log(error);
      setMessage("Login failed");
    }
  };

  const getProtected = async () => {
    try {
      const response = await axios.get("/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(response.data.message);
    } catch (error) {
      console.log(error);
      setMessage("Access denied");
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
      <h2>Protected Data</h2>
      <button onClick={getProtected}>Get Protected Data</button>

      <pre>{message}</pre>
    </>
  );
}
