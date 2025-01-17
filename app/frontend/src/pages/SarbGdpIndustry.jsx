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
        const response = await axios.get("http://localhost:3000/sarb-all"); // fetch from the backend
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
      "Construction",
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
      "Construction",
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
  const totalGDP = mapped.reduce((acc, value) => acc + value, 0);

  // find current values are sort by largest to smallest
  // find industry name related to the list

  const sortedList = response
    .filter((item) => gdpLabels.includes(item.sector)) // Filter to include only sectors in gdpLabels
    .sort((a, b) => b.currentValue - a.currentValue); // Sort in descending order
  // Store the top 3 sectors and their current values  // Store the top 3 sectors and their current values
  const topSector1 = sortedList[0]?.sector;
  const topValue1 = sortedList[0]?.currentValue;

  const topSector2 = sortedList[1]?.sector;
  const topValue2 = sortedList[1]?.currentValue;

  const topSector3 = sortedList[2]?.sector;
  const topValue3 = sortedList[2]?.currentValue;

  return (
    <div>
      <div>
        Total Value Added at Basic Prices represents the GDP generated by each
        sector or industry, reflecting the value of goods and services produced
        within an economy, excluding taxes and including subsidies on products.
        <br />
        <br />
        Total Value Added at Basic Prices ={" "}
        <span className="bg-yellow-300">
          R{parseFloat(totalGDP).toLocaleString()}m
        </span>
        .
        <br />
        <br />
        The top three sectors in South Africa for the latest period are:
        <ol>
          <li>
            1: {topSector1}: R{parseFloat(topValue1).toLocaleString()}m
          </li>
          <li>
            2: {topSector2}: R{parseFloat(topValue2).toLocaleString()}m
          </li>
          <li>
            3: {topSector3}: R{parseFloat(topValue3).toLocaleString()}m
          </li>
        </ol>
      </div>
      <div className="grid grid-cols-1 gap-4 p-8">
        {/* Chart 1: Economic Sectors for Current Year */}
        <div className="p-4 border rounded shadow">
          <h2 className="text-lg font-bold mb-4">Economic Sectors</h2>
          <div className="flex">
            <div className="w-1/2 pr-2">
              <h2 className="text-lg font-bold mb-4">
                Current year (R millions)
              </h2>
              <Doughnut
                data={economicSectorsCurrent}
                options={{
                  responsive: true,
                  plugins: {
                    tooltip: { enabled: true },
                    legend: {
                      display: false,
                    },

                    datalabels: {
                      display: true,
                      color: "white",
                      formatter: (value, context) => {
                        const label =
                          context.chart.data.labels[context.dataIndex];
                        const maxLineLength = 10; // Maximum characters per line

                        // Split the label by words and wrap to fit within maxLineLength
                        const words = label.split(" ");
                        let lines = [];
                        let currentLine = "";

                        words.forEach((word) => {
                          if ((currentLine + word).length > maxLineLength) {
                            lines.push(currentLine.trim());
                            currentLine = word + " ";
                          } else {
                            currentLine += word + " ";
                          }
                        });

                        if (currentLine) {
                          lines.push(currentLine.trim());
                        }

                        return lines; // Return an array of lines for wrapping
                      },
                      align: "center", // Align the text inside the segment
                      anchor: "center", // Anchor the text inside the chart
                      font: {
                        size: 12, // Adjust font size
                      },
                      textAlign: "center", // Ensure text is centered horizontally
                    },
                  },
                }}
              />
            </div>
            <div className="w-1/2 pl-2">
              <h2 className="text-lg font-bold mb-4">
                Prior year (R millions)
              </h2>
              <Doughnut
                data={economicSectorsPrevious}
                options={{
                  responsive: true,
                  plugins: {
                    tooltip: { enabled: true },
                    legend: {
                      display: false,
                    },
                    datalabels: {
                      display: true,
                      color: "white",
                      formatter: (value, context) => {
                        const label =
                          context.chart.data.labels[context.dataIndex];
                        const maxLineLength = 10; // Maximum characters per line

                        // Split the label by words and wrap to fit within maxLineLength
                        const words = label.split(" ");
                        let lines = [];
                        let currentLine = "";

                        words.forEach((word) => {
                          if ((currentLine + word).length > maxLineLength) {
                            lines.push(currentLine.trim());
                            currentLine = word + " ";
                          } else {
                            currentLine += word + " ";
                          }
                        });

                        if (currentLine) {
                          lines.push(currentLine.trim());
                        }

                        return lines; // Return an array of lines for wrapping
                      },
                      align: "center", // Align the text inside the segment
                      anchor: "center", // Anchor the text inside the chart
                      font: {
                        size: 12, // Adjust font size
                      },
                      textAlign: "center", // Ensure text is centered horizontally
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
              plugins: { tooltip: { enabled: true }, datalabels: false },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SarbGdpIndustry;
