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

const SarbResCur = () => {
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

  // Data for Chart 7: International Reserves and Currency
  const intResCur = {
    labels: [
      "Gold and Foreign Exchange Contingency Reserve Account (nsa)",
      "Official Reserve Assets",
      "IMF reserve position",
      "Special drawing rights",
      "Foreign currency reserves",
      "Other reserve assets",
    ],
    datasets: [
      {
        label: "Current Data (R Million)",
        data: [
          "Gold and Foreign Exchange Contingency Reserve Account (nsa)",
          "Official Reserve Assets",
          "IMF reserve position",
          "Special drawing rights",
          "Foreign currency reserves",
          "Other reserve assets",
        ]
          .map(
            (label) =>
              response.find((item) => item.sector === label)?.currentValue || 0
          )
          .map((value) => parseFloat(value)),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
      {
        label: "Previous Data (R Million)",
        data: [
          "Gold and Foreign Exchange Contingency Reserve Account (nsa)",
          "Official Reserve Assets",
          "IMF reserve position",
          "Special drawing rights",
          "Foreign currency reserves",
          "Other reserve assets",
        ]
          .map(
            (label) =>
              response.find((item) => item.sector === label)?.previousValue || 0
          )
          .map((value) => parseFloat(value)),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-8">
      {/* Chart 7: International Reserves & Currencies */}
      <div className="p-4 border rounded shadow">
        <h2 className="text-lg font-bold mb-4">
          International Reserves & Currencies
        </h2>
        <Bar
          data={intResCur}
          options={{
            responsive: true,
            plugins: { tooltip: { enabled: true } },
          }}
        />
      </div>
    </div>
  );
};

export default SarbResCur;
