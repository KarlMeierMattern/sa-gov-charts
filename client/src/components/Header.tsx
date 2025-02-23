import { useState, useEffect } from "react";
import axios from "axios";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("/user-info");
        setUsername(response.data.username);
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <header className="bg-background border-b border-border p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-foreground">
        South African Government Data Visualisation - Hello{" "}
        {username.toUpperCase()}
      </h1>
      <ModeToggle />
    </header>
  );
}
