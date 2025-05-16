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
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import PropTypes from "prop-types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
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
  responseRealGdpTimeline: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

function toYearMonth(dateStr) {
  // Handles both YYYY-MM-DD and YYYY-MM-DDTHH:mm:ss formats
  return dateStr.slice(0, 7);
}

function addOneMonth(ymStr) {
  // ymStr is 'YYYY-MM'
  const [year, month] = ymStr.split("-").map(Number);
  let newYear = year;
  let newMonth = month + 1;
  if (newMonth > 12) {
    newMonth = 1;
    newYear += 1;
  }
  return `${newYear.toString().padStart(4, "0")}-${newMonth
    .toString()
    .padStart(2, "0")}`;
}

function toYearMonthDay(ymStr) {
  // Convert YYYY-MM to YYYY-MM-01 for time scale compatibility
  return `${ymStr}-01`;
}

export default function TimelineChart({
  sarbChangePrimeTimeline,
  sarbChangeRepoTimeline,
  responseRealGdpTimeline,
}) {
  // Normalize all dates to YYYY-MM
  const primeYM = sarbChangePrimeTimeline.map((item) => ({
    ym: toYearMonth(item.date),
    value: item.value,
  }));
  const repoYM = sarbChangeRepoTimeline.map((item) => ({
    ym: toYearMonth(item.date),
    value: item.value,
  }));
  const gdpYM = responseRealGdpTimeline.map((item) => ({
    ym: addOneMonth(toYearMonth(item.date)),
    value: item.value,
  }));

  // Build a set of all unique YYYY-MM values
  const allYMSet = new Set([
    ...primeYM.map((item) => item.ym),
    ...repoYM.map((item) => item.ym),
    ...gdpYM.map((item) => item.ym),
  ]);
  const allYM = Array.from(allYMSet).sort();
  const allYMDates = allYM.map((ym) => toYearMonthDay(ym));

  // Create maps for quick lookup
  const primeMap = new Map(
    primeYM.map((item) => [toYearMonthDay(item.ym), item.value])
  );
  const repoMap = new Map(
    repoYM.map((item) => [toYearMonthDay(item.ym), item.value])
  );
  const gdpMap = new Map(
    gdpYM.map((item) => [toYearMonthDay(item.ym), item.value])
  );

  const chartData = {
    title: "Interest Rates and GDP",
    labels: allYMDates,
    datasets: [
      {
        label: "Prime Rate",
        data: allYMDates.map((date) => primeMap.get(date) ?? null),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
        pointHoverRadius: 6,
        pointRadius: 3,
        yAxisID: "y",
        spanGaps: true,
      },
      {
        label: "Repo Rate",
        data: allYMDates.map((date) => repoMap.get(date) ?? null),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
        pointHoverRadius: 6,
        pointRadius: 3,
        yAxisID: "y",
        spanGaps: true,
      },
      {
        label: "Real GDP",
        data: allYMDates.map((date) => gdpMap.get(date) ?? null),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
        pointHoverRadius: 6,
        pointRadius: 3,
        yAxisID: "y1",
        spanGaps: true,
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
          text: "Interest Rate (%)",
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "GDP",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      x: {
        type: "time",
        time: {
          unit: "year",
          tooltipFormat: "yyyy-MM",
          displayFormats: {
            year: "yyyy",
            month: "yyyy-MM",
          },
        },
        title: {
          display: true,
          text: "Year",
        },
        ticks: {
          callback: function (value, index, ticks) {
            const date = new Date(this.getLabelForValue(value));
            const year = date.getFullYear();
            if (index === 0) return year;
            const prevDate = new Date(
              this.getLabelForValue(ticks[index - 1].value)
            );
            const prevYear = prevDate.getFullYear();
            return year !== prevYear ? year : "";
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
      <h2 className="text-lg font-bold mb-4">{chartData.title}</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}
