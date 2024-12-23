import React, { useEffect, useState } from "react";
import axios from "axios";

const WorldBank = () => {
  const [response, setResponse] = useState("Empty");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/gov/world-bank"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        setResponse(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return <pre>{JSON.stringify(response, null, 2)}</pre>;
};

export default WorldBank;
