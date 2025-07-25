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

SarbGdp.propTypes = {
  response: PropTypes.array.isRequired,
};

export default function SarbGdp({ response }) {
  const gdpExpApp = [
    "Private",
    "Government",
    "Domestic investment",
    // "Change in inventories",
    // "Residual item",
    "Exports",
    "Imports",
  ];

  const gdpData = {
    labels: gdpExpApp,
    datasets: [
      {
        label: "Latest Data (R Million)",
        data: [
          "Private consumption expenditure (sa)",
          "Consumption expenditure by general government (sa)",
          "Gross domestic fixed investment (sa)",
          // "Change in inventories (sa)",
          // "Residual item (sa)",
          "Exports of goods and non-factor services (sa)",
          "Imports of goods and non-factor services (sa)",
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
        label: "Previous Period (R Million)",
        data: [
          "Private consumption expenditure (sa)",
          "Consumption expenditure by general government (sa)",
          "Gross domestic fixed investment (sa)",
          // "Change in inventories (sa)",
          // "Residual item (sa)",
          "Exports of goods and non-factor services (sa)",
          "Imports of goods and non-factor services (sa)",
        ]
          .map(
            (label) =>
              response?.find((item) => item.sector === label)?.previousValue ||
              0
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
          plugins: {
            tooltip: { enabled: true },
            datalabels: false,
            legend: { display: false },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                display: false,
              },
            },
          },
        }}
      />
    </div>
  );
}
