import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  TrendingUpDown,
  TrendingUp,
  Users,
  Gem,
  DollarSign,
  Banknote,
  Info,
} from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const SarbOverview = () => {
  const [response, setResponse] = useState(null);
  const [responseAll, setResponseAll] = useState(null);
  const [responseFx, setResponseFx] = useState(null);
  const [responseJse, setResponseJse] = useState(null);

  const [loadingOther, setLoadingOther] = useState(true);
  const [loadingAll, setLoadingAll] = useState(true);
  const [loadingFx, setLoadingFx] = useState(true);
  const [loadingJse, setLoadingJse] = useState(true);

  const [errorOther, setErrorOther] = useState(null);
  const [errorAll, setErrorAll] = useState(null);
  const [errorFx, setErrorFx] = useState(null);
  const [errorJse, setErrorJse] = useState(null);

  // Get base URL based on environment
  const baseUrl =
    import.meta.env.VITE_ENV === "development"
      ? import.meta.env.VITE_DEV_BASE_URL
      : import.meta.env.VITE_PROD_BASE_URL;

  axios.defaults.baseURL = baseUrl;

  // Fetch inflation rate, repo rate, prime rate, GDP growth data
  useEffect(() => {
    const fetchOtherData = async () => {
      try {
        setLoadingOther(true);
        const response = await axios.get("/sarb-other");
        setResponse(response.data);
      } catch (error) {
        console.error(error);
        setErrorOther("Failed to fetch data for SARB Other.");
      } finally {
        setLoadingOther(false);
      }
    };

    fetchOtherData();
  }, []);

  // Fetch unemployment, population data
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoadingAll(true);
        const response = await axios.get("/sarb-all");
        setResponseAll(response.data);
      } catch (error) {
        console.error(error);
        setErrorAll("Failed to fetch data for SARB All.");
      } finally {
        setLoadingAll(false);
      }
    };

    fetchAllData();
  }, []);

  // Fetch US/ZAR FX rate data
  useEffect(() => {
    const fetchFxData = async () => {
      try {
        setLoadingFx(true);
        const response = await axios.get("/sarb-repo"); // fetch from the backend
        setResponseFx(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
        setErrorFx("Failed to fetch data");
      } finally {
        setLoadingFx(false);
      }
    };

    fetchFxData();
  }, []);

  // Fetch JSE data
  useEffect(() => {
    const fetchJseData = async () => {
      try {
        setLoadingJse(true);
        const response = await axios.get("/jse"); // fetch from the backend
        setResponseJse(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
        setErrorJse("Failed to fetch data");
      } finally {
        setLoadingJse(false);
      }
    };

    fetchJseData();
  }, []);

  if (loadingOther || loadingAll || loadingFx || loadingJse)
    return <div>Loading...</div>;
  if (errorOther) return <div>Error: {errorOther}</div>;
  if (errorAll) return <div>Error: {errorAll}</div>;
  if (errorFx) return <div>Error: {errorFx}</div>;
  if (errorJse) return <div>Error: {errorJse}</div>;

  const inflationRate = response.find((item) => item.name === "CPI");

  const repoRate = response.find(
    (item) => item.name === "Dates of change in the repurchase rate"
  );

  const primeRate = response.find(
    (item) => item.name === "Dates of change in the prime lending rate"
  );

  const realGdpGrowth = response.find(
    (item) => item.name === "Real GDP growth rate"
  );

  const unemployRate = responseAll.find(
    (item) =>
      item.sector ===
      "Unemployment rate (nsa)\nPlease see the statement regarding updating of info on the STATS SA website"
  );

  const population = responseAll.find(
    (item) => item.sector === "POPULATION (mid-year estimates as at 30 June)"
  );

  const usZarRate = responseFx.find(
    (item) => item.name === "Rand per US Dollar"
  );

  const exports =
    responseAll.find(
      (item) => item.sector === "Exports of goods and non-factor services (sa)"
    )?.currentValue || 0;

  const imports =
    responseAll.find(
      (item) => item.sector === "Imports of goods and non-factor services (sa)"
    )?.currentValue || 0;

  const tradeBalance = exports - imports;

  const budgetBalance =
    response.find(
      (item) =>
        item.name === "National government balance as % of GDP (Fiscal year)"
    )?.value || 0;

  const currentAccount =
    responseAll.find((item) => item.sector === "Current account (nsa)")
      ?.currentValue || 0;

  const gdp =
    responseAll.find(
      (item) => item.sector === "GDP at market prices (current, sa)"
    )?.currentValue || 0;

  const gdpDate =
    responseAll.find(
      (item) => item.sector === "GDP at market prices (current, sa)"
    )?.period || 0;

  const capitalAccount =
    responseAll.find((item) => item.sector === "Capital account (nsa)")
      ?.currentValue || 0;

  const financialAccount =
    responseAll.find((item) => item.sector === "Financial account")
      ?.currentValue || 0;

  const balanceOfPayments = currentAccount + capitalAccount + financialAccount;

  const totalDebt = responseAll.find(
    (item) => item.sector === "Total gross loan debt (nsa)"
  );

  const debtPercentGdp = (totalDebt?.currentValue / gdp) * 100;

  const allShareIndex =
    responseJse.find((item) => item.name === "All Share")?.value || 0;

  const interest = responseAll
    .filter((item) => item.sector === "Interest")
    .reduce((acc, item) => acc + item.currentValue, 0);

  const interestPercentGdp = Math.round((interest / gdp) * 100 * 10) / 10;

  const cardData = [
    {
      title: "Inflation Rate",
      value: `${inflationRate?.value}%`,
      description: "Consumer Price Index (CPI)",
      icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
      info: null,
    },
    {
      title: "Repo Rate",
      value: `${repoRate?.value}%`,
      description: `@ ${repoRate?.date}`,
      icon: <Banknote className="h-4 w-4 text-muted-foreground" />,
      info: "Set by the central bank, affects the overall cost of borrowing in the economy.",
    },
    {
      title: "Prime Rate",
      value: `${primeRate?.value}%`,
      description: `@ ${primeRate?.date}`,
      icon: <Gem className="h-4 w-4 text-muted-foreground" />,
      info: "Rate that commercial banks charge their most creditworthy customers.",
    },
    {
      title: "USD/ZAR Exchange Rate",
      value: `${parseFloat(usZarRate?.value).toFixed(2)}`,
      description: `FX Rate @ ${usZarRate?.lastPeriod}`,
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Real GDP Growth",
      value: `${realGdpGrowth?.value}%`,
      description: `@ ${realGdpGrowth?.date}`,
      info: "Economic growth, adjusted for inflation, reflecting the increase in the value of goods and services produced.",
      icon: <TrendingUpDown className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Unemployment Rate",
      value: `${unemployRate?.currentValue}%`,
      description: `Of labor force for ${unemployRate?.period}`,
      info: "",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Population",
      value: `${(population?.currentValue / 1000).toFixed(0)}m`,
      description: `Population for ${population?.period}`,
      info: "",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Stock Market Index",
      value: `${allShareIndex}`,
      description: `Major stock exchange`,
      info: "",
      icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Trade Balance",
      value: `R${parseFloat(tradeBalance).toLocaleString()}m`,
      description:
        "Exports and imports of goods and services. Trade surplus (positive) or deficit (negative).",
      info: "The net value of goods and services sold to and bought from other countries. Forms part of the current account.",
      icon: <Banknote className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Budget Balance % of GDP",
      value: `${budgetBalance}%`,
      description: "(Government revenue - expenses) / GDP.",
      info: "Positive = budget surplus (government saves).\nNegative = budget deficit (government borrows).",
      icon: <Gem className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Current Account",
      value: `R${parseFloat(currentAccount).toLocaleString()}m`,
      description: "Trade balance + income from abroad + transfers",
      info: "",
      icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Capital Account",
      value: `R${parseFloat(capitalAccount).toLocaleString()}m`,
      description: "Tracks one-time transfers of capital assets.",
      info: "Debt forgiveness, land purchases.",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Financial Account",
      value: `R${parseFloat(financialAccount).toLocaleString()}m`,
      description: "Tracks investments and financial flows.",
      info: "Foreign direct investment, stock/bond purchases, and reserve assets.",
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Balance of Payments",
      value: `R${parseFloat(balanceOfPayments).toLocaleString()}m`,
      description: "Current account + capital account + financial account.",
      info: "Tracks all economic transactions between South Africa and the world.",
      icon: <TrendingUpDown className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Government interest costs % of GDP",
      value: `${interestPercentGdp}%`,
      description: `Based on GDP of R${parseFloat(
        gdp
      ).toLocaleString()}m at ${gdpDate}`,
      info: null,
      icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Debt-to-GDP ratio",
      value: `${parseFloat(debtPercentGdp).toFixed(2)}%`,
      description: `Based on government debt of R${parseFloat(
        totalDebt.currentValue
      ).toLocaleString()}m at ${totalDebt.period}`,
      info: "The debt-to-GDP ratio compares a country's public debt to its GDP.",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2"></div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {" "}
              {cardData.map((data) => (
                <Card key={data.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {data.title}
                    </CardTitle>
                    {data.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{data.value}</div>
                    <div className="flex flex-row justify-between">
                      <p className="text-xs text-muted-foreground">
                        {data.description}
                      </p>
                      {data.info && (
                        <HoverCard>
                          <HoverCardTrigger>
                            <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                          </HoverCardTrigger>
                          <HoverCardContent className="text-xs">
                            {data.info}
                          </HoverCardContent>
                        </HoverCard>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SarbOverview;
