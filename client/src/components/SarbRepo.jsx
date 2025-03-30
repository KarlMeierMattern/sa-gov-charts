import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

import PropTypes from "prop-types";

SarbRepo.propTypes = {
  response: PropTypes.array.isRequired,
};

export default function SarbRepo({ response }) {
  // Data for Chart 1: Interest Rates
  const interestRates = {
    title: "Interest rates",
    labels: ["Repo", "Sabor", "Zaronia", "Overnight"],
    datasets: [
      {
        label: "Rate (%)",
        data: ["Repo rate", "Sabor", "Zaronia", "Overnight FX rate"]
          .map(
            (label) => response?.find((item) => item.name === label)?.value || 0
          )
          .map((value) => parseFloat(value)),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Data for Chart 2: Treasury and NCD Rates
  const treasuryRates = {
    title: "Treasury bill and NCD Rates",
    labels: [
      "91-day",
      "182-day",
      "273-day",
      "364-day",
      "3-months",
      "6-months",
      "12-months",
    ],
    datasets: [
      {
        label: "Rate (%)",
        data: [
          "Treasury bills - 91 day (tender rates)",
          "Treasury bills - 182 day (tender rates)",
          "Treasury bills - 273 day (tender rates)",
          "Treasury bills - 364 day (tender rates)",
          "NCD's - 3 months (closing rates)",
          "NCD's - 6 months (closing rates)",
          "NCD's - 12 months (closing rates)",
        ]
          .map(
            (label) => response?.find((item) => item.name === label)?.value || 0
          )
          .map((value) => parseFloat(value)),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Data for Chart 3: Currency Exchange Rates
  const currencyRates = {
    title: "Currency Exchange Rates",
    labels: [
      "ZAR/USD",
      "ZAR/GBP",
      "ZAR/Euro",
      // "ZAR/Yen"
    ],
    datasets: [
      {
        label: "Exchange Rate",
        data: [
          "Rand per US Dollar",
          "Rand per British Pound",
          "Rand per Euro",
          // "Rand per Japanese Yen",
        ].map((label) =>
          parseFloat(response?.find((item) => item.name === label)?.value || 0)
        ),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Data for Chart 4: Bond Yields and Indices
  const bondYields = {
    title: "Bond Yields and Indices",
    labels: [
      "Prime",
      "R2030",
      "R186",
      "5-10 years",
      "+ 10 years",
      // "Nominal effective exchange rate",
    ],
    datasets: [
      {
        label: "Rate (%)",
        data: [
          "Prime lending rate",
          "8.00% 2030 (R2030) (closing yields)",
          "10,5% 2026 (R186) (closing yields)",
          "5-10 years (daily average bond yields)",
          "10 years and longer (daily average bond yields)",
          // "Nominal effective exchange rate",
        ].map((label) =>
          parseFloat(response?.find((item) => item.name === label)?.value || 0)
        ),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Group chart data in an array for mapping
  const chartData = [interestRates, treasuryRates, currencyRates, bondYields];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-8">
      {chartData.map((data, index) => (
        <div key={index} className="p-4 border rounded shadow">
          <h2 className="text-lg font-bold mb-4">{data.title}</h2>
          <Bar
            data={data}
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
      ))}
    </div>
  );
}
