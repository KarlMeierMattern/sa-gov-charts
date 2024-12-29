import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SarbGdp = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/gov/sarb-gdp"); // fetch from the backend
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

  // Prepare data for Chart 1: GDP by Industry
  const gdpData = {
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
      "Total value added at basic prices",
      "GDP at market prices (current, sa)",
    ],
    datasets: [
      {
        label: "Latest Data (R Million)",
        data: response.map((item) => parseFloat(item.data.latestData)), // Access 'latestData' from the 'data' field
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Previous Period (R Million)",
        data: response.map((item) => parseFloat(item.data.previousPeriod)), // Access 'previousPeriod' from the 'data' field
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Percentage Change (%)",
        data: response.map((item) => parseFloat(item.data.percentageChange)), // Access 'percentageChange' from the 'data' field
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
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
    "Total value added at basic prices",
  ];

  // for each label find the value and sum the values
  const mapped = gdpLabels.map((item) => {
    const found = response.find((unit) => unit.data.industry === item);
    return found ? parseFloat(found.data.latestData) : 0; // Return the value or 0 if not found
  });
  const totalGDP = mapped.reduce((acc, value) => acc + value, 0);

  const privateCon =
    response.find(
      (item) => item.data.industry === "Private consumption expenditure (sa)"
    )?.data.latestData || 0;

  const conGov =
    response.find(
      (item) =>
        item.data.industry ===
        "Consumption expenditure by general government (sa)"
    )?.data.latestData || 0;

  const fixInv =
    response.find(
      (item) => item.data.industry === "Gross domestic fixed investment (sa)"
    )?.data.latestData || 0;

  const changeInv =
    response.find((item) => item.data.industry === "Change in inventories (sa)")
      ?.data.latestData || 0;

  const exports =
    response.find(
      (item) =>
        item.data.industry === "Exports of goods and non-factor services (sa)"
    )?.data.latestData || 0;

  const imports =
    response.find(
      (item) =>
        item.data.industry === "Imports of goods and non-factor services (sa)"
    )?.data.latestData || 0;

  const residItem =
    response.find((item) => item.data.industry === "Residual item (sa)")?.data
      .latestData || 0;

  const gdp =
    response.find((item) => item.data.industry === "Gross domestic expenditure")
      ?.data.latestData || 0;

  const gdpExpApp = [
    "Private consumption expenditure (sa)",
    "Consumption expenditure by general government (sa)",
    "Gross domestic fixed investment (sa)",
    "Change in inventories (sa)",
    "Residual item (sa)",
    "Exports of goods and non-factor services (sa)",
    "Imports of goods and non-factor services (sa)",
  ];

  const gdpMapped = gdpExpApp.map((item) => {
    const responseFound = response.find((unit) => unit.data.industry === item);
    return responseFound ? parseFloat(responseFound.data.latestData) : 0;
  });
  const calcGdp =
    gdpMapped.reduce((acc, value) => acc + value, 0) - 2 * imports;

  return (
    <div>
      <div className="p-8">
        The industry that contributes repo rate in South Africa is:
        <br></br>Total GDP is <span className="font-bold">{totalGDP}</span>
        <br></br>
        <br></br>
        <span className="font-bold">Expenditure Approach</span>
        <br></br>
        <br></br>
        The GDP expenditure is calculated as:
        <br></br>
        <span className="font-bold">GDP</span> = C + G + I + &Delta;I + (X - M).
        <br></br>
        <br></br>
        Where:
        <br></br>
        <br></br>
        <span className="font-bold">C</span>: Private Consumption Expenditure =
        R{parseFloat(privateCon).toLocaleString()}m<br></br>
        <span className="font-bold">G</span>: Government Consumption Expenditure
        = R{parseFloat(conGov).toLocaleString()}m<br></br>
        <span className="font-bold">I</span>: Gross Domestic Fixed Investment =
        R{parseFloat(fixInv).toLocaleString()}m<br></br>
        <span className="font-bold">&Delta;I</span> : Change in Inventories = R
        {parseFloat(changeInv).toLocaleString()}m<br></br>
        <span className="font-bold">X</span>: Exports = R
        {parseFloat(exports).toLocaleString()}m<br></br>
        <span className="font-bold">M</span>: Imports = R
        {parseFloat(imports).toLocaleString()}m<br></br>
        <span className="font-bold">Residual</span> ={" "}
        {parseFloat(residItem).toLocaleString()}m<br></br>
        <br></br>
        GDP = {calcGdp.toLocaleString()}
      </div>
      <div className="grid grid-cols-1 gap-4 p-8">
        <div className="p-4 border rounded shadow">
          <h2 className="text-lg font-bold mb-4">SARB GDP Data by Industry</h2>
          <Bar
            data={gdpData}
            options={{
              responsive: true,
              plugins: { tooltip: { enabled: true } },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SarbGdp;
