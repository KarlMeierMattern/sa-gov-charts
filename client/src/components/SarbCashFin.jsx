import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import { defaultBarOptions } from "@/lib/chartSetup";
import "@/lib/chartSetup";

SarbCashFin.propTypes = {
  response: PropTypes.array.isRequired,
};

export default function SarbCashFin({ response }) {
  // Data for Chart 5: Cash-Flow and Financing
  const cashFinance = {
    labels: [
      "Gov. guaranteed debt",
      "Credit to gov.",
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
    <div className="p-4 border rounded-2xl shadow">
      <h2 className="text-lg font-bold mb-4">Cash Flow & Financing</h2>
      <Bar data={cashFinance} options={defaultBarOptions} />
    </div>
  );
}
