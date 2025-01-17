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

const SarbProdEmploy = () => {
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

  // Data for Chart 4: Production and Employment Data
  const prodEmploy = {
    labels: [
      "Manufacturing Production Index (sa)",
      "Leading indicator",
      "Employment (sa)",
      "Unemployment rate (nsa)",
      "Wages/Earnings (sa)",
    ],
    datasets: [
      {
        label: "Current Data (R Million)",
        data: [
          "Manufacturing Production Index (sa)\nPlease see the statement regarding updating of info on the STATS SA website",
          "Leading indicator",
          "Employment (sa)\nPlease see the statement regarding updating of info on the STATS SA website",
          "Unemployment rate (nsa)\nPlease see the statement regarding updating of info on the STATS SA website",
          "Wages/Earnings (sa)\nPlease see the statement regarding updating of info on the STATS SA website",
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
          "Manufacturing Production Index (sa)\nPlease see the statement regarding updating of info on the STATS SA website",
          "Leading indicator",
          "Employment (sa)\nPlease see the statement regarding updating of info on the STATS SA website",
          "Unemployment rate (nsa)\nPlease see the statement regarding updating of info on the STATS SA website",
          "Wages/Earnings (sa)\nPlease see the statement regarding updating of info on the STATS SA website",
        ]
          .map(
            (label) =>
              response.find((item) => item.sector === label)?.previousValue || 0
          )
          .map((value) => parseFloat(value)),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-8">
      {/* Chart 4: Production & Employment */}
      <div className="p-4 border rounded shadow">
        <h2 className="text-lg font-bold mb-4">Production & Employment</h2>
        <Bar
          data={prodEmploy}
          options={{
            responsive: true,
            plugins: { tooltip: { enabled: true }, datalabels: false },
          }}
        />
      </div>
    </div>
  );
};

export default SarbProdEmploy;
