import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "chartjs-adapter-date-fns";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export { ChartJS };

export const defaultBarOptions = {
  responsive: true,
  plugins: {
    tooltip: { enabled: true },
    legend: { display: true, position: "top" },
    datalabels: { display: false },
  },
  scales: {
    x: { grid: { display: false } },
    y: { grid: { display: false } },
  },
};

export const defaultLineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top" },
    tooltip: {
      enabled: true,
      mode: "nearest",
      intersect: false,
    },
    datalabels: { display: false },
  },
  hover: {
    mode: "nearest",
    intersect: false,
  },
};
