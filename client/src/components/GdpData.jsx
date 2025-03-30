import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  LinearScale,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the plugin

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  LinearScale,
  ChartDataLabels
);

const GdpData = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get base URL based on environment
  const baseUrl =
    import.meta.env.VITE_ENV === "development"
      ? import.meta.env.VITE_DEV_BASE_URL
      : import.meta.env.VITE_PROD_BASE_URL;

  axios.defaults.baseURL = baseUrl;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/sarb-all"); // fetch from the backend
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

  const gdpData = {
    labels: [
      "Total value added at basic prices*",
      "GDP at market prices (current, sa)",
      "GDP at market prices (constant, sa)",
    ],
    datasets: [
      {
        label: "Latest Data (R Million)",
        data: [
          "Total value added at basic prices",
          "GDP at market prices (current, sa)",
          "GDP at market prices (constant, sa)",
        ]
          .map(
            (label) =>
              response.find((item) => item.sector === label)?.currentValue || 0
          )
          .map((value) => parseFloat(value)),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Previous Data (R Million)",
        data: [
          "Total value added at basic prices",
          "GDP at market prices (current, sa)",
          "GDP at market prices (constant, sa)",
        ]
          .map(
            (label) =>
              response.find((item) => item.sector === label)?.previousValue || 0
          )
          .map((value) => parseFloat(value)),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-4">GDP Data</h2>
      <Bar
        data={gdpData}
        options={{
          responsive: true,
          plugins: { tooltip: { enabled: true }, datalabels: false },
        }}
      />
    </div>
  );
};

export default GdpData;
