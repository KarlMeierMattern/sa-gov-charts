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

  const gdpExpApp = [
    "Private consumption expenditure (sa)",
    "Consumption expenditure by general government (sa)",
    "Gross domestic fixed investment (sa)",
    "Change in inventories (sa)",
    "Residual item (sa)",
    "Exports of goods and non-factor services (sa)",
    "Imports of goods and non-factor services (sa)",
  ];

  // Prepare data for Chart 1: GDP by Industry
  const gdpData = {
    labels: gdpExpApp,
    datasets: [
      {
        label: "Latest Data (R Million)",
        data: [
          "Private consumption expenditure (sa)",
          "Consumption expenditure by general government (sa)",
          "Gross domestic fixed investment (sa)",
          "Change in inventories (sa)",
          "Residual item (sa)",
          "Exports of goods and non-factor services (sa)",
          "Imports of goods and non-factor services (sa)",
        ]
          .map(
            (label) =>
              response.find((item) => item.industry === label)?.latestData || 0
          )
          .map((value) => parseFloat(value)),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Previous Period (R Million)",
        data: [
          "Private consumption expenditure (sa)",
          "Consumption expenditure by general government (sa)",
          "Gross domestic fixed investment (sa)",
          "Change in inventories (sa)",
          "Residual item (sa)",
          "Exports of goods and non-factor services (sa)",
          "Imports of goods and non-factor services (sa)",
        ]
          .map(
            (label) =>
              response.find((item) => item.industry === label)
                ?.previousPeriod || 0
          )
          .map((value) => parseFloat(value)),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const privateCon =
    response.find(
      (item) => item.industry === "Private consumption expenditure (sa)"
    )?.latestData || 0;

  const conGov =
    response.find(
      (item) =>
        item.industry === "Consumption expenditure by general government (sa)"
    )?.latestData || 0;

  const fixInv =
    response.find(
      (item) => item.industry === "Gross domestic fixed investment (sa)"
    )?.latestData || 0;

  const changeInv =
    response.find((item) => item.industry === "Change in inventories (sa)")
      ?.latestData || 0;

  const exports =
    response.find(
      (item) =>
        item.industry === "Exports of goods and non-factor services (sa)"
    )?.latestData || 0;

  const imports =
    response.find(
      (item) =>
        item.industry === "Imports of goods and non-factor services (sa)"
    )?.latestData || 0;

  const residItem =
    response.find((item) => item.industry === "Residual item (sa)")
      ?.latestData || 0;

  const gdp =
    response.find((item) => item.industry === "Gross domestic expenditure")
      ?.latestData || 0;

  // const gdpMapped = gdpExpApp.map((item) => {
  //   const responseFound = response.find((unit) => unit.data.industry === item);
  //   return responseFound ? parseFloat(responseFound.data.latestData) : 0;
  // });
  // const calcGdp =
  //   gdpMapped.reduce((acc, value) => acc + value, 0) - 2 * imports;

  const quarterReported =
    response.find((item) => item.industry === "Gross domestic expenditure")
      ?.dateOfLatest || 0;

  return (
    <div>
      <div className="p-8">
        The seasonally adjusted and annualised GDP for South Africa at{" "}
        {quarterReported} is R{parseFloat(gdp).toLocaleString()}m
        <br />
        <br />
        <span className="font-bold">Expenditure Approach</span>
        <br />
        Under the expenditure approach GDP is calculated as:{" "}
        <span className="bg-yellow-300">C + G + I + &Delta;I + (X - M).</span>
        <br />
        <br />
        Where:
        <br />
        <br />
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
        <span className="bg-yellow-300">
          GDP = R{parseFloat(gdp).toLocaleString()}m
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 p-8">
        <div className="p-4 border rounded shadow">
          <h2 className="text-lg font-bold mb-4">SARB GDP Data</h2>
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

export default SarbGdp;
