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

SarbProdEmploy.propTypes = {
  response: PropTypes.array.isRequired,
};

export default function SarbProdEmploy({ response }) {
  // Data for Chart 4: Production and Employment Data
  const prodEmploy = {
    labels: ["MPI", "Leading indicator", "Employment", "Wages"],
    datasets: [
      {
        label: "Latest Data (2015=100)",
        data: [
          "Manufacturing Production Index (sa)\nPlease see the statement regarding updating of info on the STATS SA website",
          "Leading indicator",
          "Employment (sa)\nPlease see the statement regarding updating of info on the STATS SA website",
          "Wages/Earnings (sa)\nPlease see the statement regarding updating of info on the STATS SA website",
        ]
          .map(
            (label) =>
              response?.find((item) => item.sector === label)?.currentValue || 0
          )
          .map((value) => parseFloat(value)),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
      {
        label: "Previous Data (2015=100)",
        data: [
          "Manufacturing Production Index (sa)\nPlease see the statement regarding updating of info on the STATS SA website",
          "Leading indicator",
          "Employment (sa)\nPlease see the statement regarding updating of info on the STATS SA website",
          "Wages/Earnings (sa)\nPlease see the statement regarding updating of info on the STATS SA website",
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
      <h2 className="text-lg font-bold mb-4">Production & Employment</h2>
      <Bar
        data={prodEmploy}
        options={{
          responsive: true,
          plugins: { tooltip: { enabled: true }, datalabels: false },
        }}
      />
    </div>
  );
}
