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

import PropTypes from "prop-types";

GdpData.propTypes = {
  response: PropTypes.array.isRequired,
};

export default function GdpData({ response }) {
  const gdpData = {
    labels: [
      "Total value added at basic prices",
      "GDP at market prices",
      "GDP at market prices",
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
              response?.find((item) => item.sector === label)?.currentValue || 0
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
              response?.find((item) => item.sector === label)?.previousValue ||
              0
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
          plugins: {
            tooltip: { enabled: true },
            datalabels: false,
            legend: {
              display: true,
              position: "right",
            },
          },
        }}
      />
    </div>
  );
}
