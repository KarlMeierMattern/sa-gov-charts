import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import { defaultBarOptions } from "@/lib/chartSetup";
import "@/lib/chartSetup";

SarbResCur.propTypes = {
  response: PropTypes.array.isRequired,
};

export default function SarbResCur({ response }) {
  // Data for Chart 7: International Reserves and Currency
  const intResCur = {
    labels: ["Gold", "Forex", "Total reserves"],
    datasets: [
      {
        label: "Latest Data (R Million)",
        data: ["Gold", "Foreign currency reserves", "Official Reserve Assets"]
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
        label: "Previous Data (R Million)",
        data: ["Gold", "Foreign currency reserves", "Official Reserve Assets"]
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
    <div className="p-4 border rounded-2xl shadow">
      <h2 className="text-lg font-bold mb-4">
        International Reserves & Currencies
      </h2>
      <Bar data={intResCur} options={defaultBarOptions} />
    </div>
  );
}
