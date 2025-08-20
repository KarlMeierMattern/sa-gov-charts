import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PropTypes from "prop-types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

FxTimelineChart.propTypes = {
  responseFxTimeline: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  responseGbpTimeline: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  responseEuroTimeline: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default function FxTimelineChart({
  responseFxTimeline,
  responseGbpTimeline,
  responseEuroTimeline,
}) {
  // Sort all three arrays by date ascending (oldest to newest)
  const sortedFx = [...responseFxTimeline].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const sortedGbp = [...responseGbpTimeline].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const sortedEuro = [...responseEuroTimeline].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const labels = sortedGbp.map((item) => item.date.slice(0, 10));

  const chartData = {
    labels,
    datasets: [
      {
        label: "USD/ZAR",
        data: sortedFx.map((item) => item.value),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
        pointHoverRadius: 6,
        pointRadius: 3,
        // spanGaps: true,
      },
      {
        label: "GBP/ZAR",
        data: sortedGbp.map((item) => item.value),
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        tension: 0.4,
        pointHoverRadius: 6,
        pointRadius: 3,
        // spanGaps: true,
      },
      {
        label: "EUR/ZAR",
        data: sortedEuro.map((item) => item.value),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
        pointHoverRadius: 6,
        pointRadius: 3,
        // spanGaps: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
        mode: "nearest",
        intersect: false,
        callbacks: {
          title: function (context) {
            return context[0].label;
          },
        },
      },
      datalabels: {
        display: false,
      },
    },
    hover: {
      mode: "nearest",
      intersect: false,
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Exchange Rate",
        },
        grid: {
          display: false,
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
        grid: {
          display: false,
        },
        ticks: {
          callback: function (value, index) {
            // Show fewer ticks on smaller screens
            const screenWidth = window.innerWidth;
            const skipFactor =
              screenWidth < 768 ? 8 : screenWidth < 1024 ? 6 : 4;
            return index % skipFactor === 0
              ? this.getLabelForValue(value).slice(0, 10)
              : "";
          },
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
      },
    },
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-4">
        FX Timeline (USD, GBP, EUR vs ZAR)
      </h2>
      <div className="h-[400px]">
        <Line
          data={chartData}
          options={{
            ...options,
            maintainAspectRatio: false,
            responsive: true,
          }}
        />
      </div>
    </div>
  );
}
