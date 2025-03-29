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

  const gdpExpApp = [
    "Private consumption",
    "Government consumption",
    "Domestic fixed investment",
    "Change in inventories",
    "Residual item",
    "Exports",
    "Imports",
  ];

  // Prepare data for Chart 1: GDP by Industry
  const gdpData = {
    labels: gdpExpApp,
    datasets: [
      {
        label: "Latest Data (R Million)",
        data: [
          "Private consumption expenditure (sa)",
          "Consumption expenditure by general government (sa)",
          "Gross domestic fixed investment (sa)",
          "Change in inventories (sa)",
          "Residual item (sa)",
          "Exports of goods and non-factor services (sa)",
          "Imports of goods and non-factor services (sa)",
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
        label: "Previous Period (R Million)",
        data: [
          "Private consumption expenditure (sa)",
          "Consumption expenditure by general government (sa)",
          "Gross domestic fixed investment (sa)",
          "Change in inventories (sa)",
          "Residual item (sa)",
          "Exports of goods and non-factor services (sa)",
          "Imports of goods and non-factor services (sa)",
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
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-4">
        GDP by Consumption & Expenditure Category
      </h2>
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

export default SarbGdp;
