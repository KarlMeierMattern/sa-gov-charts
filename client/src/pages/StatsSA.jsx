import { useEffect, useState } from "react";
import axios from "axios";

const StatsSA = () => {
  const [response, setResponse] = useState(null);

  // Get base URL based on environment
  const baseUrl =
    import.meta.env.VITE_ENV === "development"
      ? import.meta.env.VITE_DEV_BASE_URL
      : import.meta.env.VITE_PROD_BASE_URL;

  axios.defaults.baseURL = baseUrl;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the scraped data from your backend
        const response = await axios.get("/stats-sa");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        setResponse(response.data);
      } catch (error) {
        console.error("Error fetching scraped data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {response ? (
        <div>
          <h1>Population: {response.population}</h1>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StatsSA;
