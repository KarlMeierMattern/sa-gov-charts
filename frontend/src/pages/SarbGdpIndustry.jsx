import { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut, Bar } from "react-chartjs-2";
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

const SarbGdpIndustry = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/gov/sarb-all"); // fetch from the backend
        setResponse(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Data for Chart 1: Economic Sectors for Current Year
  const economicSectorsCurrent = {
    labels: [
      "Agriculture, forestry and fishing",
      "Mining and quarrying",
      "Manufacturing",
      "Electricity and water",
      "Construction (contractors)",
      "Wholesale and retail trade, catering and accommodation",
      "Transport, storage and communication",
      "Finance and insurance, real estate and business services",
      "Personal services",
      "General government services",
    ],
    datasets: [
      {
        label: "Current Year Data",
        data: [
          "Agriculture, forestry and fishing",
          "Mining and quarrying",
          "Manufacturing",
          "Electricity and water",
          "Construction (contractors)",
          "Wholesale and retail trade, catering and accommodation",
          "Transport, storage and communication",
          "Finance and insurance, real estate and business services",
          "Personal services",
          "General government services",
        ]
          .map(
            (label) =>
              response.find((item) => item.sector === label)?.currentValue || 0
          )
          .map((value) => parseFloat(value)),
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Data for Chart 1: Economic Sectors for Previous Year
  const economicSectorsPrevious = {
    labels: [
      "Agriculture, forestry and fishing",
      "Mining and quarrying",
      "Manufacturing",
      "Electricity and water",
      "Construction (contractors)",
      "Wholesale and retail trade, catering and accommodation",
      "Transport, storage and communication",
      "Finance and insurance, real estate and business services",
      "Personal services",
      "General government services",
    ],
    datasets: [
      {
        label: "Previous Year Data",
        data: [
          "Agriculture, forestry and fishing",
          "Mining and quarrying",
          "Manufacturing",
          "Electricity and water",
          "Construction (contractors)",
          "Wholesale and retail trade, catering and accommodation",
          "Transport, storage and communication",
          "Finance and insurance, real estate and business services",
          "Personal services",
          "General government services",
        ]
          .map(
            (label) =>
              response.find((item) => item.sector === label)?.previousValue || 0
          )
          .map((value) => parseFloat(value)),
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Data for Chart 2: GDP Data (Bar chart remains unchanged)
  const gdpData = {
    labels: [
      "Total value added at basic prices",
      "GDP at market prices (current, sa)",
      "GDP at market prices (constant, sa)",
    ],
    datasets: [
      {
        label: "Current Data (R Million)",
        data: [
          "Total value added at basic prices",
          "GDP at market prices (current, sa)",
          "GDP at market prices (constant, sa)",
        ]
          .map(
            (label) =>
              response.find((item) => item.sector === label)?.currentValue || 0
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
              response.find((item) => item.sector === label)?.previousValue || 0
          )
          .map((value) => parseFloat(value)),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  const gdpLabels = [
    "Agriculture, forestry and fishing",
    "Mining and quarrying",
    "Manufacturing",
    "Electricity and water",
    "Construction (contractors)",
    "Wholesale and retail trade, catering and accommodation",
    "Transport, storage and communication",
    "Finance and insurance, real estate and business services",
    "Personal services",
    "General government services",
  ];

  // for each label find the value and sum the values
  const mapped = gdpLabels.map((item) => {
    const found = response.find((unit) => unit.sector === item);
    return found ? parseFloat(found.currentValue) : 0; // Return the value or 0 if not found
  });
  const totalGDP = mapped.reduce((acc, value) => acc + value, 0) / 2;

  return (
    <div>
      <div>
        Total Value Added at Basic Prices = R
        {parseFloat(totalGDP).toLocaleString()}m.
        <br />
        To get from this point to GDP we'd add taxes and subtract subsidies on
        products.
      </div>
      <div className="grid grid-cols-1 gap-4 p-8">
        {/* Chart 1: Economic Sectors for Current Year */}
        <div className="p-4 border rounded shadow">
          <h2 className="text-lg font-bold mb-4">
            Economic Sectors (Current Year)
          </h2>
          <div className="flex">
            <div className="w-1/2 pr-2">
              <Doughnut
                data={economicSectorsCurrent}
                options={{
                  responsive: true,
                  plugins: {
                    tooltip: { enabled: true },
                    datalabels: {
                      display: true,
                      color: "white",
                      formatter: (value, context) => {
                        return context.chart.data.labels[context.dataIndex];
                      },
                    },
                  },
                }}
              />
            </div>
            <div className="w-1/2 pl-2">
              <Doughnut
                data={economicSectorsPrevious}
                options={{
                  responsive: true,
                  plugins: {
                    tooltip: { enabled: true },
                    datalabels: {
                      display: true,
                      color: "white",
                      formatter: (value, context) => {
                        return context.chart.data.labels[context.dataIndex];
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
        {/* Chart 2: GDP Data (Bar chart remains unchanged) */}
        <div className="p-4 border rounded shadow">
          <h2 className="text-lg font-bold mb-4">GDP Data</h2>
          <Bar
            data={gdpData}
            options={{
              responsive: true,
              plugins: { tooltip: { enabled: true } },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SarbGdpIndustry;
