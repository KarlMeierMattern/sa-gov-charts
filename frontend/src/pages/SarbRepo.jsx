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

const SarbRepo = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/gov/sarb-repo"); // fetch from the backend
        setResponse(response.data);
        console.log(response.data);
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

  // Data for Chart 1: Interest Rates
  const interestRates = {
    labels: ["Repo rate", "Sabor", "Zaronia", "Overnight FX rate"],
    datasets: [
      {
        label: "Rate (%)",
        data: ["Repo rate", "Sabor", "Zaronia", "Overnight FX rate"]
          .map(
            (label) => response.find((item) => item.name === label)?.value || 0
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
    labels: [
      "TBill 91 day",
      "TBill 182 day",
      "TBill 273 day",
      "TBill 364 day",
      "NCD 3 months",
      "NCD 6 months",
      "NCD 12 months",
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
            (label) => response.find((item) => item.name === label)?.value || 0
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
    labels: [
      "ZAR/USD",
      "ZAR/GBP",
      "ZAR/Euro",
      // "ZAR/Yen"
    ],
    datasets: [
      {
        label: "Exchange Rate (Rand)",
        data: [
          "Rand per US Dollar",
          "Rand per British Pound",
          "Rand per Euro",
          // "Rand per Japanese Yen",
        ]
          .map((label) => response.find((item) => item.name === label)?.value)
          .map((value) => parseFloat(value)),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Data for Chart 4: Bond Yields and Indices
  const bondYields = {
    labels: [
      "Prime",
      "R2030",
      "R186",
      "5-10 years",
      "10 years +",
      // "Nominal effective exchange rate",
    ],
    datasets: [
      {
        label: "Value (%)",
        data: [
          "Prime lending rate",
          "8.00% 2030 (R2030) (closing yields)",
          "10,5% 2026 (R186) (closing yields)",
          "5-10 years (daily average bond yields)",
          "10 years and longer (daily average bond yields)",
          // "Nominal effective exchange rate",
        ]
          .map((label) => response.find((item) => item.name === label)?.value)
          .map((value) => parseFloat(value)),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const currentRepo =
    response.find((item) => item.name === "Repo rate")?.value || 0; // Use optional chaining and provide a default value

  const primeRate =
    response.find((item) => item.name === "Prime lending rate")?.value || 0;

  const currentPeriod =
    response.find((item) => item.name === "Repo rate")?.lastPeriod || 0;

  const date = new Date(currentPeriod);

  // Get the day, month, and year
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // Format the output
  const formattedDate = `${day} ${month} ${year}`;

  return (
    <div>
      <div className="p-8">
        As at <span className="font-bold bg-yellow-300">{formattedDate}</span>{" "}
        the current repo rate in South Africa is{" "}
        <span className="font-bold bg-yellow-300">{currentRepo}%</span> while
        the current prime rate is{" "}
        <span className="font-bold bg-yellow-300">{primeRate}%</span>.
        <br />
        <br />
        When you hear people talking the "interest rate" they're generally
        talking about the repo rate (repurchase rate). This is the interest rate
        at which the{" "}
        <span className="font-bold">
          South African Reserve Bank (SARB)
        </span>{" "}
        lends money to commercial banks. Banks then use the repo rate to
        determine the interest rate that they charge you to borrow money and the
        rate they pay you on your savings. Generally, the best available rate
        you can get at the bank is known as prime, which is the repo rate plus a
        certain margin.
        <br></br>
      </div>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 p-8">
        {/* Chart 1: Interest Rates */}
        <div className="p-4 border rounded shadow">
          <h2 className="text-lg font-bold mb-4">Interest Rates</h2>
          <Bar
            data={interestRates}
            options={{
              responsive: true,
              plugins: { tooltip: { enabled: true }, datalabels: false },
            }}
          />
        </div>

        {/* Chart 2: Treasury and NCD Rates */}
        <div className="p-4 border rounded shadow">
          <h2 className="text-lg font-bold mb-4">Treasury and NCD Rates</h2>
          <Bar
            data={treasuryRates}
            options={{
              responsive: true,
              plugins: { tooltip: { enabled: true }, datalabels: false },
            }}
          />
        </div>
        {/* Chart 3: Currency Exchange Rates */}
        <div className="p-4 border rounded shadow">
          <h2 className="text-lg font-bold mb-4">Currency Exchange Rates</h2>
          <Bar
            data={currencyRates}
            options={{
              responsive: true,
              plugins: { tooltip: { enabled: true }, datalabels: false },
            }}
          />
        </div>
        {/* Chart 4: Bond Yields and Indices */}
        <div className="p-4 border rounded shadow">
          <h2 className="text-lg font-bold mb-4">Bond Yields and Indices</h2>
          <Bar
            data={bondYields}
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

export default SarbRepo;
