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

TimelineChart.propTypes = {
  sarbChangePrimeTimeline: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  sarbChangeRepoTimeline: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default function TimelineChart({
  sarbChangePrimeTimeline,
  sarbChangeRepoTimeline,
}) {
  // Prepare reversed data for chronological order (oldest to newest)
  const reversedPrime = [...sarbChangePrimeTimeline].reverse();
  const reversedRepo = [...sarbChangeRepoTimeline].reverse();

  const chartData = {
    title: "Interest rates",
    labels: reversedPrime.map((item) => item.date.slice(0, 10)),
    datasets: [
      {
        label: "Prime Rate",
        data: reversedPrime.map((item) => item.value),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
        pointHoverRadius: 6,
        pointRadius: 3,
        fill: "-1",
      },
      {
        label: "Repo Rate",
        data: reversedRepo.map((item) => item.value),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
        pointHoverRadius: 6,
        pointRadius: 3,
        fill: false,
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
            // context[0].label is the formatted date (YYYY-MM-DD)
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
        beginAtZero: false,
        title: {
          display: true,
          text: "Rate (%)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-4">{chartData.title}</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}
