import { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
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

const EconomicSectors = () => {
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

  // Data for Chart 1: Economic Sectors for Current Year
  const economicSectorsCurrent = {
    title: "Current year (R millions)",
    labels: [
      "Agriculture, forestry and fishing",
      "Mining and quarrying",
      "Manufacturing",
      "Electricity and water",
      "Construction",
      "Wholesale and retail trade, catering and accommodation",
      "Transport, storage and communication",
      "Finance and insurance, real estate and business services",
      "Personal services",
      "General government services",
    ],
    datasets: [
      {
        label: "Current Year Data",
        data: [
          "Agriculture, forestry and fishing",
          "Mining and quarrying",
          "Manufacturing",
          "Electricity and water",
          "Construction (contractors)",
          "Wholesale and retail trade, catering and accommodation",
          "Transport, storage and communication",
          "Finance and insurance, real estate and business services",
          "Personal services",
          "General government services",
        ]
          .map(
            (label) =>
              response.find((item) => item.sector === label)?.currentValue || 0
          )
          .map((value) => parseFloat(value)),
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-4">Economic Sectors</h2>
      <Doughnut
        data={economicSectorsCurrent}
        options={{
          responsive: true,
          plugins: {
            tooltip: { enabled: true },
            legend: {
              display: true,
              position: "bottom",
            },
            datalabels: {
              display: false,
              color: "white",
              formatter: (value, context) => {
                const currentValue =
                  context.chart.data.datasets[0].data[context.dataIndex];
                return currentValue;
              },
              align: "center",
              anchor: "center",
              font: {
                size: 12,
              },
              textAlign: "center",
            },
          },
        }}
      />
    </div>
  );
};

export default EconomicSectors;
