import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import { defaultLineOptions } from "@/lib/chartSetup";
import "@/lib/chartSetup";

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

function normalizeDate(dateStr) {
  return dateStr.slice(0, 10);
}

function buildDateMap(timeline) {
  return new Map(
    timeline.map((item) => [normalizeDate(item.date), item.value])
  );
}

export default function FxTimelineChart({
  responseFxTimeline,
  responseGbpTimeline,
  responseEuroTimeline,
}) {
  const fxMap = buildDateMap(responseFxTimeline);
  const gbpMap = buildDateMap(responseGbpTimeline);
  const euroMap = buildDateMap(responseEuroTimeline);

  const labels = [
    ...new Set([
      ...responseFxTimeline.map((item) => normalizeDate(item.date)),
      ...responseGbpTimeline.map((item) => normalizeDate(item.date)),
      ...responseEuroTimeline.map((item) => normalizeDate(item.date)),
    ]),
  ].sort();

  const chartData = {
    labels,
    datasets: [
      {
        label: "USD/ZAR",
        data: labels.map((date) => fxMap.get(date) ?? null),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
        pointHoverRadius: 6,
        pointRadius: 3,
        spanGaps: true,
      },
      {
        label: "GBP/ZAR",
        data: labels.map((date) => gbpMap.get(date) ?? null),
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        tension: 0.4,
        pointHoverRadius: 6,
        pointRadius: 3,
        spanGaps: true,
      },
      {
        label: "EUR/ZAR",
        data: labels.map((date) => euroMap.get(date) ?? null),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
        pointHoverRadius: 6,
        pointRadius: 3,
        spanGaps: true,
      },
    ],
  };

  const options = {
    ...defaultLineOptions,
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Exchange Rate",
        },
        grid: { display: false },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
        grid: { display: false },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 8,
          maxRotation: 0,
          minRotation: 0,
          callback(value, index) {
            const label = this.getLabelForValue(value);
            return index % 2 === 0 ? label.slice(0, 10) : "";
          },
        },
      },
    },
  };

  return (
    <div
      className="p-4 border rounded-2xl shadow"
      role="img"
      aria-label="FX timeline chart showing USD, GBP, and EUR exchange rates against the rand"
    >
      <h2 className="text-lg font-bold mb-4">
        FX Timeline (USD, GBP, EUR vs ZAR)
      </h2>
      <div className="h-[400px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
