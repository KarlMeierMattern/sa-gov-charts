import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Landmark,
  Briefcase,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PropTypes from "prop-types";
import SparklineChart from "./SparklineChart.jsx";
import { quarterToDate, sortByDate, formatNumber } from "../utils/dateUtils";

// SARB labels gold price under "US Dollar" on the market rates page
const SARB_GOLD_LABEL = "US Dollar";

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
  responseUnemployment: PropTypes.array.isRequired,
  responseUnemploymentTimeline: PropTypes.array.isRequired,
};

function InfoButton({ label, info }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`More info about ${label}`}
          className="rounded-sm text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Info className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="text-xs whitespace-pre-line">{info}</PopoverContent>
    </Popover>
  );
}

InfoButton.propTypes = {
  label: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
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
  responseUnemployment,
  responseUnemploymentTimeline,
}) {
  const cardData = useMemo(() => {
    const reversedRepoTimeline = sortByDate(responseRepoTimeline);
    const reversedFxTimeline = sortByDate(responseFxTimeline);
    const reversedRealGdpTimeline = sortByDate(responseRealGdpTimeline);
    const reversedPrimeTimeline = sortByDate(responsePrimeTimeline);
    const reversedGoldTimeline = sortByDate(responseGoldTimeline);
    const reversedGbpTimeline = sortByDate(responseGbpTimeline);
    const reversedEuroTimeline = sortByDate(responseEuroTimeline);

    const unemploymentRate = responseUnemployment[0]?.unemploymentRate;
    const unemploymentDate = responseUnemployment[0]?.date;

    const unemploymentTimeline = Array.isArray(responseUnemploymentTimeline)
      ? responseUnemploymentTimeline
          .map((item) => ({
            date: quarterToDate(item.date),
            value: item.value,
          }))
          .sort((a, b) => a.date - b.date)
      : [];

    const goldPrice = responseFx.find((item) => item.name === SARB_GOLD_LABEL);
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

    const inflationRate = response.find((item) => item.name === "CPI");
    const realGdpGrowth = response.find(
      (item) => item.name === "Real GDP growth rate"
    );
    const budgetBalance =
      response.find(
        (item) =>
          item.name === "National government balance as % of GDP (Fiscal year)"
      )?.value || 0;

    const population = responseAll.find(
      (item) => item.sector === "POPULATION (mid-year estimates as at 30 June)"
    );
    const exports =
      responseAll.find(
        (item) =>
          item.sector === "Exports of goods and non-factor services (sa)"
      )?.currentValue || 0;
    const imports =
      responseAll.find(
        (item) =>
          item.sector === "Imports of goods and non-factor services (sa)"
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

    const debtPercentGdp =
      totalDebt?.currentValue && gdp
        ? (totalDebt.currentValue / gdp) * 100
        : null;

    const allShareIndex =
      responseJse.find((item) => item.name === "All Share")?.value || 0;

    const interest = responseAll
      .filter((item) => item.sector === "Interest")
      .reduce((acc, item) => acc + item.currentValue, 0);

    const interestPercentGdp =
      gdp > 0 ? Math.round((interest / gdp) * 100 * 10) / 10 : null;

    const cards = [
      {
        title: "Inflation Rate",
        value: inflationRate?.value != null ? `${inflationRate.value}%` : "—",
        description: "Consumer Price Index (CPI)",
        icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
        info: null,
      },
      {
        title: "Repo Rate",
        value: `${formatNumber(repoRate?.value, 2)}%`,
        description: repoRate?.lastPeriod
          ? `@ ${repoRate.lastPeriod}`
          : "Central bank policy rate",
        icon: <Banknote className="h-4 w-4 text-muted-foreground" />,
        info: "Set by the central bank, affects the overall cost of borrowing in the economy.",
        chart: <SparklineChart data={reversedRepoTimeline} />,
      },
      {
        title: "Prime Rate",
        value: `${formatNumber(primeRate?.value, 1)}%`,
        description: primeRate?.lastPeriod
          ? `@ ${primeRate.lastPeriod}`
          : "Commercial bank lending rate",
        icon: <Gem className="h-4 w-4 text-muted-foreground" />,
        info: "Rate that commercial banks charge their most creditworthy customers.",
        chart: <SparklineChart data={reversedPrimeTimeline} />,
      },
      {
        title: "Real GDP Growth",
        value:
          realGdpGrowth?.value != null ? `${realGdpGrowth.value}%` : "—",
        description: realGdpGrowth?.date
          ? `@ ${realGdpGrowth.date}`
          : "Inflation-adjusted growth",
        info: "Economic growth, adjusted for inflation, reflecting the increase in the value of goods and services produced.",
        icon: <TrendingUpDown className="h-4 w-4 text-muted-foreground" />,
        chart: <SparklineChart data={reversedRealGdpTimeline} />,
      },
      {
        title: "USD/ZAR Exchange Rate",
        value: formatNumber(usZarRate?.value, 1),
        description: usZarRate?.lastPeriod
          ? `FX Rate @ ${usZarRate.lastPeriod}`
          : "Rand per US dollar",
        icon: <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />,
        chart: <SparklineChart data={reversedFxTimeline} />,
      },
      {
        title: "GBP/ZAR Exchange Rate",
        value: formatNumber(gbpZarRate?.value, 1),
        description: gbpZarRate?.lastPeriod
          ? `FX Rate @ ${gbpZarRate.lastPeriod}`
          : "Rand per British pound",
        icon: <BadgePoundSterling className="h-4 w-4 text-muted-foreground" />,
        chart: <SparklineChart data={reversedGbpTimeline} />,
      },
      {
        title: "EUR/ZAR Exchange Rate",
        value: formatNumber(euroZarRate?.value, 1),
        description: euroZarRate?.lastPeriod
          ? `FX Rate @ ${euroZarRate.lastPeriod}`
          : "Rand per euro",
        icon: <BadgeEuro className="h-4 w-4 text-muted-foreground" />,
        chart: <SparklineChart data={reversedEuroTimeline} />,
      },
      {
        title: "Gold Price",
        value:
          goldPrice?.value != null
            ? `$${formatNumber(goldPrice.value, 1)}`
            : "—",
        description: goldPrice?.lastPeriod
          ? `@ ${goldPrice.lastPeriod}`
          : "USD per ounce",
        info: "Gold price in USD per ounce",
        icon: <Pickaxe className="h-4 w-4 text-muted-foreground" />,
        chart: <SparklineChart data={reversedGoldTimeline} />,
      },
      {
        title: "Unemployment Rate",
        value:
          unemploymentRate != null ? `${unemploymentRate}%` : "—",
        description: unemploymentDate
          ? `Of labor force for ${unemploymentDate}`
          : "Share of labor force",
        info: "Percentage of the labor force that is unemployed and actively seeking work.",
        icon: <Briefcase className="h-4 w-4 text-muted-foreground" />,
        chart: <SparklineChart data={unemploymentTimeline} />,
      },
      {
        title: "Population",
        value: population?.currentValue
          ? `${(population.currentValue / 1000).toFixed(0)}m`
          : "—",
        description: population?.period
          ? `Population for ${population.period}`
          : "Mid-year estimate",
        info: "Mid-year population estimate from national accounts data.",
        icon: <Users className="h-4 w-4 text-muted-foreground" />,
      },
      {
        title: "All Share Index",
        value: allShareIndex ? `${allShareIndex}` : "—",
        description: "JSE All Share",
        info: "Broad market index of the Johannesburg Stock Exchange.",
        icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
      },
      {
        title: "Government interest costs % of GDP",
        value:
          interestPercentGdp != null ? `${interestPercentGdp}%` : "—",
        description:
          gdp > 0
            ? `Based on GDP of R${parseFloat(gdp).toLocaleString()}m at ${gdpDate}`
            : "Interest as share of GDP",
        info: "Government interest payments as a percentage of GDP.",
        icon: <Landmark className="h-4 w-4 text-muted-foreground" />,
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

    if (debtPercentGdp != null && totalDebt) {
      cards.push({
        title: "Debt-to-GDP ratio",
        value: `${formatNumber(debtPercentGdp, 1)}%`,
        description: `Based on government debt of R${parseFloat(
          totalDebt.currentValue
        ).toLocaleString()}m at ${totalDebt.period}`,
        info: "The debt-to-GDP ratio compares a country's public debt to its GDP.",
        icon: <Landmark className="h-4 w-4 text-muted-foreground" />,
      });
    }

    return cards;
  }, [
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
    responseUnemployment,
    responseUnemploymentTimeline,
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cardData.map((data) => (
        <Card key={data.title}>
          <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
            <CardTitle className="text-sm font-medium min-w-0 truncate">
              {data.title}
            </CardTitle>
            <div className="flex shrink-0 items-center gap-1">
              {data.chart}
              {data.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.value}</div>
            <div className="flex justify-between items-start gap-2 mt-1">
              <p className="text-xs text-muted-foreground">{data.description}</p>
              {data.info && <InfoButton label={data.title} info={data.info} />}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
