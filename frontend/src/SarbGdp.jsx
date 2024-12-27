import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SarbGdp = () => {
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

  // Prepare data for Chart 1: GDP by Industry
  const gdpData = {
    labels: response.map((item) => item.data.industry), // Access the 'industry' from the 'data' field
    datasets: [
      {
        label: "Latest Data (R Million)",
        data: response.map((item) => parseFloat(item.data.latestData)), // Access 'latestData' from the 'data' field
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Previous Period (R Million)",
        data: response.map((item) => parseFloat(item.data.previousPeriod)), // Access 'previousPeriod' from the 'data' field
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Percentage Change (%)",
        data: response.map((item) => parseFloat(item.data.percentageChange)), // Access 'percentageChange' from the 'data' field
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-8">
      <div className="p-4 border rounded shadow">
        <h2 className="text-lg font-bold mb-4">SARB GDP Data by Industry</h2>
        <Bar
          data={gdpData}
          options={{
            responsive: true,
            plugins: { tooltip: { enabled: true } },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default SarbGdp;
