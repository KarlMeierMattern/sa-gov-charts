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

const SarbCashFin = () => {
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

  // Data for Chart 5: Cash-Flow and Financing
  const cashFinance = {
    labels: [
      "Cash receipts",
      "Cash payments",
      "Interest",
      "Cash-flow from operations",
      "Cash-flow from investments",
      "Cash surplus/deficit",
      "Cash-flow from financing",
      "Financial assets (excl. cash)",
      "Liabilities",
      "Other debt (nsa)",
      "Government guaranteed debt",
      "Credit to government",
      "Credit to private sector",
      "External position",
      "M3 money",
    ],
    datasets: [
      {
        label: "Latest Data (R Million)",
        data: [
          "Cash receipts from operating activities",
          "Cash payments for operating activities",
          "Of which: Interest",
          "Net cash-flow from operating activities",
          "Net cash-flow from investment activities",
          "Cash surplus/deficit",
          "Net cash-flow from financing activities",
          "Financial assets other than cash",
          "Liabilities",
          "Other debt (nsa)",
          "Government guaranteed debt",
          "Domestic credit to the government sector (net) (nsa)",
          "Domestic credit to the private sector (nsa)",
          "External position",
          "Monetary aggregate: M3 (nsa)",
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
          "Cash receipts from operating activities",
          "Cash payments for operating activities",
          "Of which: Interest",
          "Net cash-flow from operating activities",
          "Net cash-flow from investment activities",
          "Cash surplus/deficit",
          "Net cash-flow from financing activities",
          "Financial assets other than cash",
          "Liabilities",
          "Other debt (nsa)",
          "Government guaranteed debt",
          "Domestic credit to the government sector (net) (nsa)",
          "Domestic credit to the private sector (nsa)",
          "External position",
          "Monetary aggregate: M3 (nsa)",
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
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-4">Cash Flow & Financing</h2>
      <Bar
        data={cashFinance}
        options={{
          responsive: true,
          plugins: { tooltip: { enabled: true }, datalabels: false },
        }}
      />
    </div>
  );
};

export default SarbCashFin;
