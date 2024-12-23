import React, { useState, useEffect } from "react";
import axios from "axios";

const SARB = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/gov/sarb-gdp"); // fetch from the backend
        setResponse(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>SARB GDP Data</h1>
      {response ? (
        <ul>
          {response.map((item, index) => (
            <li key={index}>
              <strong>ID:</strong> {item.id}
              <pre>{JSON.stringify(item.data, null, 2)}</pre>
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default SARB;
