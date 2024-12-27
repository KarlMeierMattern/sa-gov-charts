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

const SarbGdpIndustry = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/gov/sarb-all"); // fetch from the backend
        setResponse(response.data);
        console.log(response.data);
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

  // Data for Chart 1: Economic Sectors
  const economicSectors = {
    labels: [
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
    ],
    datasets: [
      {
        label: "Latest Data (R Million)",
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
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Previous Data (R Million)",
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
              response.find((item) => item.sector === label)?.previousValue || 0
          )
          .map((value) => parseFloat(value)),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Data for Chart 2: GDP Data
  const gdpData = {
    labels: [
      "Total value added at basic prices",
      "GDP at market prices (current, sa)",
      "GDP at market prices (constant, sa)",
    ],
    datasets: [
      {
        label: "Current Data (R Million)",
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
    <div className="grid grid-cols-1 gap-4 p-8">
      {/* Chart 1: Economic Sectors */}
      <div className="p-4 border rounded shadow">
        <h2 className="text-lg font-bold mb-4">Economic Sectors</h2>
        <Bar
          data={economicSectors}
          options={{
            responsive: true,
            plugins: { tooltip: { enabled: true } },
          }}
        />
      </div>
      {/* Chart 2: GDP Data */}
      <div className="p-4 border rounded shadow">
        <h2 className="text-lg font-bold mb-4">GDP Data</h2>
        <Bar
          data={gdpData}
          options={{
            responsive: true,
            plugins: { tooltip: { enabled: true } },
          }}
        />
      </div>
    </div>
  );
};

export default SarbGdpIndustry;
