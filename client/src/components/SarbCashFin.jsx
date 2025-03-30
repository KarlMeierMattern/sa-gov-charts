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

import PropTypes from "prop-types";

SarbCashFin.propTypes = {
  response: PropTypes.array.isRequired,
};

export default function SarbCashFin({ response }) {
  // Data for Chart 5: Cash-Flow and Financing
  const cashFinance = {
    labels: [
      "Government guaranteed debt",
      "Credit to government",
      "Credit to private sector",
    ],
    datasets: [
      {
        label: "Latest Data (R Million)",
        data: [
          "Government guaranteed debt",
          "Domestic credit to the government sector (net) (nsa)",
          "Domestic credit to the private sector (nsa)",
        ]
          .map(
            (label) =>
              response?.find((item) => item.sector === label)?.currentValue || 0
          )
          .map((value) => parseFloat(value)),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Previous Data (R Million)",
        data: [
          "Government guaranteed debt",
          "Domestic credit to the government sector (net) (nsa)",
          "Domestic credit to the private sector (nsa)",
        ]
          .map(
            (label) =>
              response?.find((item) => item.sector === label)?.previousValue ||
              0
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
          plugins: {
            tooltip: { enabled: true },
            datalabels: false,
            legend: { display: false },
          },
        }}
      />
    </div>
  );
}
