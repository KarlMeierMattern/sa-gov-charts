import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  TrendingUpDown,
  TrendingUp,
  Users,
  Gem,
  Banknote,
  Info,
  Pickaxe,
  BadgeEuro,
  BadgePoundSterling,
  BadgeDollarSign,
} from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import PropTypes from "prop-types";
import SparklineChart from "./SparklineChart.jsx";
// import { getPackedSettings } from "http2";

SarbOverview.propTypes = {
  response: PropTypes.array.isRequired,
  responseAll: PropTypes.array.isRequired,
  responseFx: PropTypes.array.isRequired,
  responseJse: PropTypes.array.isRequired,
  responseRepoTimeline: PropTypes.array.isRequired,
  responseFxTimeline: PropTypes.array.isRequired,
  responseRealGdpTimeline: PropTypes.array.isRequired,
  responsePrimeTimeline: PropTypes.array.isRequired,
  responseGoldTimeline: PropTypes.array.isRequired,
  responseGbpTimeline: PropTypes.array.isRequired,
  responseEuroTimeline: PropTypes.array.isRequired,
};

export default function SarbOverview({
  response,
  responseAll,
  responseFx,
  responseJse,
  responseRepoTimeline,
  responseFxTimeline,
  responseRealGdpTimeline,
  responsePrimeTimeline,
  responseGoldTimeline,
  responseGbpTimeline,
  responseEuroTimeline,
}) {
  // Timelines
  const reversedRepoTimeline = [...responseRepoTimeline].reverse();
  const reversedFxTimeline = [...responseFxTimeline].reverse();
  const reversedRealGdpTimeline = [...responseRealGdpTimeline].reverse();
  const reversedPrimeTimeline = [...responsePrimeTimeline].reverse();
  const reversedGoldTimeline = [...responseGoldTimeline].reverse();
  const reversedGbpTimeline = [...responseGbpTimeline].reverse();
  const reversedEuroTimeline = [...responseEuroTimeline].reverse();

  // Gold, repo, prime, usd/zar
  const goldPrice = responseFx.find((item) => item.name === "US Dollar");
  const repoRate = responseFx.find((item) => item.name === "Repo rate");
  const primeRate = responseFx.find(
    (item) => item.name === "Prime lending rate"
  );
  const usZarRate = responseFx.find(
    (item) => item.name === "Rand per US Dollar"
  );
  const gbpZarRate = responseFx.find(
    (item) => item.name === "Rand per British Pound"
  );
  const euroZarRate = responseFx.find((item) => item.name === "Rand per Euro");
  // Inflation rate, real GDP growth, budget balance
  const inflationRate = response.find((item) => item.name === "CPI");
  const realGdpGrowth = response.find(
    (item) => item.name === "Real GDP growth rate"
  );
  const budgetBalance =
    response.find(
      (item) =>
        item.name === "National government balance as % of GDP (Fiscal year)"
    )?.value || 0;

  // Unemployment rate, population, exports, imports, trade balance
  const unemployRate = responseAll.find(
    (item) =>
      item.sector ===
      "Unemployment rate (nsa)\nPlease see the statement regarding updating of info on the STATS SA website"
  );
  const population = responseAll.find(
    (item) => item.sector === "POPULATION (mid-year estimates as at 30 June)"
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
      value: `${parseFloat(repoRate?.value).toFixed(1)}%`,
      description: `@ ${repoRate?.lastPeriod}`,
      icon: <Banknote className="h-4 w-4 text-muted-foreground" />,
      info: "Set by the central bank, affects the overall cost of borrowing in the economy.",
      chart: <SparklineChart data={reversedRepoTimeline} />,
    },
    {
      title: "Prime Rate",
      value: `${parseFloat(primeRate?.value).toFixed(1)}%`,
      description: `@ ${primeRate?.lastPeriod}`,
      icon: <Gem className="h-4 w-4 text-muted-foreground" />,
      info: "Rate that commercial banks charge their most creditworthy customers.",
      chart: <SparklineChart data={reversedPrimeTimeline} />,
    },
    {
      title: "Real GDP Growth",
      value: `${realGdpGrowth?.value}%`,
      description: `@ ${realGdpGrowth?.date}`,
      info: "Economic growth, adjusted for inflation, reflecting the increase in the value of goods and services produced.",
      icon: <TrendingUpDown className="h-4 w-4 text-muted-foreground" />,
      chart: <SparklineChart data={reversedRealGdpTimeline} />,
    },
    {
      title: "USD/ZAR Exchange Rate",
      value: `${parseFloat(usZarRate?.value).toFixed(1)}`,
      description: `FX Rate @ ${usZarRate?.lastPeriod}`,
      icon: <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />,
      chart: <SparklineChart data={reversedFxTimeline} />,
    },
    {
      title: "GBP/ZAR Exchange Rate",
      value: `${parseFloat(gbpZarRate?.value).toFixed(1)}`,
      description: `FX Rate @ ${gbpZarRate?.lastPeriod}`,
      icon: <BadgePoundSterling className="h-4 w-4 text-muted-foreground" />,
      chart: <SparklineChart data={reversedGbpTimeline} />,
    },
    {
      title: "EUR/ZAR Exchange Rate",
      value: `${parseFloat(euroZarRate?.value).toFixed(1)}`,
      description: `FX Rate @ ${euroZarRate?.lastPeriod}`,
      icon: <BadgeEuro className="h-4 w-4 text-muted-foreground" />,
      chart: <SparklineChart data={reversedEuroTimeline} />,
    },
    {
      title: "Gold Price",
      value: `$${parseFloat(goldPrice?.value).toFixed(1)}`,
      description: `@ ${goldPrice?.lastPeriod}`,
      info: "Gold price in USD per ounce",
      icon: <Pickaxe className="h-4 w-4 text-muted-foreground" />,
      chart: <SparklineChart data={reversedGoldTimeline} />,
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
      title: "All Share Index",
      value: `${allShareIndex}`,
      description: `JSE`,
      info: "",
      icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
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
      value: `${parseFloat(debtPercentGdp).toFixed(1)}%`,
      description: `Based on government debt of R${parseFloat(
        totalDebt.currentValue
      ).toLocaleString()}m at ${totalDebt.period}`,
      info: "The debt-to-GDP ratio compares a country's public debt to its GDP.",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Budget Balance % of GDP",
      value: `${budgetBalance}%`,
      description: "(Government revenue - expenses) / GDP.",
      info: "Positive = budget surplus (government saves).\nNegative = budget deficit (government borrows).",
      icon: <Gem className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Trade Balance",
      value: `R${(parseFloat(tradeBalance) / 1000)
        .toFixed(1)
        .toLocaleString()}b`,
      description: "Exports and imports of goods and services.",
      info: "The net value of goods and services sold to and bought from other countries. Trade surplus (positive) or deficit (negative). Forms part of the current account.",
      icon: <Banknote className="h-4 w-4 text-muted-foreground" />,
    },
    // {
    //   title: "Current Account",
    //   value: `R${(parseFloat(currentAccount) / 1000)
    //     .toFixed(1)
    //     .toLocaleString()}b`,
    //   description: "Trade balance + income from abroad + transfers",
    //   info: "",
    //   icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
    // },
    // {
    //   title: "Capital Account",
    //   value: `R${(parseFloat(capitalAccount) / 1000)
    //     .toFixed(1)
    //     .toLocaleString()}b`,
    //   description: "Tracks one-time transfers of capital assets.",
    //   info: "Debt forgiveness, land purchases.",
    //   icon: <Users className="h-4 w-4 text-muted-foreground" />,
    // },
    // {
    //   title: "Financial Account",
    //   value: `R${(parseFloat(financialAccount) / 1000)
    //     .toFixed(1)
    //     .toLocaleString()}b`,
    //   description: "Tracks investments and financial flows.",
    //   info: "Foreign direct investment, stock/bond purchases, and reserve assets.",
    //   icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
    // },
    {
      title: "Balance of Payments",
      value: `R${(parseFloat(balanceOfPayments) / 1000)
        .toFixed(1)
        .toLocaleString()}b`,
      description: "Current account + capital account + financial account.",
      info: "Tracks all economic transactions between South Africa and the world.",
      icon: <TrendingUpDown className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2"></div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
              {" "}
              {cardData.map((data) => (
                <Card key={data.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {data.title}
                    </CardTitle>
                    {data.chart && data.chart}
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
}
