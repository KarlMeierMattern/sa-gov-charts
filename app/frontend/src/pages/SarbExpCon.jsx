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

const SarbExpCon = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/sarb-all"); // fetch from the backend
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

  // Data for Chart 3: Expenditure and Consumption
  const expConsumption = {
    labels: [
      "Gross domestic expenditure",
      "Exports of goods and non-factor services (sa)",
      "Imports of goods and non-factor services (sa)",
      "Final consumption expenditure by household (sa)",
      "Final consumption expenditure by general government (sa)",
      "Gross fixed capital formation (sa)",
      "Change in inventories (sa)",
      "Residual item (sa)",
      "Gross domestic expenditure (sa)",
    ],
    datasets: [
      {
        label: "Current Data (R Million)",
        data: [
          "Gross domestic expenditure",
          "Exports of goods and non-factor services (sa)",
          "Imports of goods and non-factor services (sa)",
          "Final consumption expenditure by household (sa)",
          "Final consumption expenditure by general government (sa)",
          "Gross fixed capital formation (sa)",
          "Change in inventories (sa)",
          "Residual item (sa)",
          "Gross domestic expenditure (sa)",
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
          "Gross domestic expenditure",
          "Exports of goods and non-factor services (sa)",
          "Imports of goods and non-factor services (sa)",
          "Final consumption expenditure by household (sa)",
          "Final consumption expenditure by general government (sa)",
          "Gross fixed capital formation (sa)",
          "Change in inventories (sa)",
          "Residual item (sa)",
          "Gross domestic expenditure (sa)",
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
      {/* Chart 3: Expenditure & Consumptiop */}
      <div className="p-4 border rounded shadow">
        <h2 className="text-lg font-bold mb-4">Expenditure & Consumption</h2>
        <Bar
          data={expConsumption}
          options={{
            responsive: true,
            plugins: { tooltip: { enabled: true }, datalabels: false },
          }}
        />
      </div>
    </div>
  );
};

export default SarbExpCon;
