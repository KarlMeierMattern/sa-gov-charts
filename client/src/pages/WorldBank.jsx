import { useEffect, useState } from "react";
import axios from "axios";

const WorldBank = () => {
  const [response, setResponse] = useState("Empty");

  // Get base URL based on environment
  const baseUrl =
    import.meta.env.VITE_ENV === "development"
      ? import.meta.env.VITE_DEV_BASE_URL
      : import.meta.env.VITE_PROD_BASE_URL;

  axios.defaults.baseURL = baseUrl;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/world-bank");
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
