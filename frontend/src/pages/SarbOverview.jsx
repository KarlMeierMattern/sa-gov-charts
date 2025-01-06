import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import { Overview } from "@/components/ui/overview";
import { RecentSales } from "@/components/ui/recent-sales";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUpDown,
  TrendingUp,
  Users,
  ArrowUpDown,
  Activity,
  Briefcase,
  Zap,
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

// Mock data - replace with real data in a production environment
const mockData = {
  tradeBalance: -2.5,
  debtToGDP: 68.2,
  budgetDeficit: -4.3,
  fdi: 4.7,
  currentAccountBalance: -3.1,
  povertyRate: 18.9,
  hdi: 0.709,
  laborForceParticipation: 60.2,
  energyPriceIndex: 112.5,
  businessConfidence: 95.2,
  consumerConfidence: 83.7,
  stockMarketIndex: 68423,
};

export default function SarbOverview() {
  const [response, setResponse] = useState(null);
  const [responseAll, setResponseAll] = useState(null);
  const [responseFx, setResponseFx] = useState(null);

  const [loadingOther, setLoadingOther] = useState(true);
  const [loadingAll, setLoadingAll] = useState(true);
  const [loadingFx, setLoadingFx] = useState(true);

  const [errorOther, setErrorOther] = useState(null);
  const [errorAll, setErrorAll] = useState(null);
  const [errorFx, setErrorFx] = useState(null);

  const [isHovered, setIsHovered] = useState(false);

  // Fetch inflation rate, repo rate, prime rate, GDP growth data
  useEffect(() => {
    const fetchOtherData = async () => {
      try {
        setLoadingOther(true);
        const response = await axios.get(
          "http://localhost:3000/gov/sarb-other"
        );
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
        const response = await axios.get("http://localhost:3000/gov/sarb-all");
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
        const response = await axios.get("http://localhost:3000/gov/sarb-repo"); // fetch from the backend
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

  if (loadingOther || loadingAll || loadingFx) return <div>Loading...</div>;
  if (errorOther) return <div>Error: {errorOther}</div>;
  if (errorAll) return <div>Error: {errorAll}</div>;
  if (errorFx) return <div>Error: {errorFx}</div>;

  const inflationRate = response.find((item) => item.name === "CPI")?.value;

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

  const quarterReported =
    responseAll.find((item) => item.sector === "Gross domestic expenditure")
      ?.period || 0;

  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight pb-4">
            Macro Dashboard
          </h2>
          {/* <div className="flex items-center space-x-2">
            <CalendarDateRangePicker date={dateRange} setDate={setDateRange} />
          </div> */}
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          {/* <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList> */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Inflation Rate
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{inflationRate}%</div>
                  <div className="flex flex-row justify-between">
                    <p className="text-xs text-muted-foreground">
                      Consumer Price Index (CPI)
                    </p>
                    <HoverCard>
                      <HoverCardTrigger>
                        {" "}
                        <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                      </HoverCardTrigger>
                      <HoverCardContent className="text-xs">
                        The inflation rate is...
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Repo Rate
                  </CardTitle>
                  <Banknote className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{repoRate?.value}%</div>
                  <div className="flex flex-row justify-between">
                    <p className="text-xs text-muted-foreground">
                      @ {repoRate.date}
                    </p>
                    <HoverCard>
                      <HoverCardTrigger>
                        {" "}
                        <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                      </HoverCardTrigger>
                      <HoverCardContent className="text-xs">
                        Set by the central bank, affects the overall cost of
                        borrowing in the economy.
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Prime Rate
                  </CardTitle>
                  <Gem className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{primeRate?.value}%</div>
                  <div className="flex flex-row justify-between">
                    <p className="text-xs text-muted-foreground">
                      @ {primeRate?.date}
                    </p>
                    <HoverCard>
                      <HoverCardTrigger>
                        {" "}
                        <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                      </HoverCardTrigger>
                      <HoverCardContent className="text-xs">
                        Rate that commercial banks charge their most
                        creditworthy customers.
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Real GDP Growth
                  </CardTitle>
                  <TrendingUpDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {realGdpGrowth?.value}%
                  </div>
                  <div className="flex flex-row justify-between">
                    <p className="text-xs text-muted-foreground">
                      @ {realGdpGrowth?.date}
                    </p>
                    <HoverCard>
                      <HoverCardTrigger>
                        {" "}
                        <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                      </HoverCardTrigger>
                      <HoverCardContent className="text-xs">
                        Economic growth, adjusted for inflation, reflecting the
                        increase in the value of goods and services produced.
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Unemployment Rate
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {unemployRate?.currentValue}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Of labor force for {unemployRate?.period}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Population
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(population?.currentValue / 1000).toFixed(0)}m
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Population for {population?.period}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    USD/ZAR Exchange Rate
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {parseFloat(usZarRate?.value).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    FX Rate @ {usZarRate?.lastPeriod}
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>GDP and Unemployment</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>GDP</CardTitle>
                  <CardDescription>
                    By expenditure type seasonally adjusted and annualised at{" "}
                    {quarterReported}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Trade Balance
                  </CardTitle>
                  <Banknote className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{repoRate?.value}%</div>
                  <div className="flex flex-row justify-between">
                    <p className="text-xs text-muted-foreground">
                      Exports and imports of goods and services. Forms part of
                      the current account.
                    </p>
                    <HoverCard>
                      <HoverCardTrigger>
                        {" "}
                        <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                      </HoverCardTrigger>
                      <HoverCardContent className="text-xs">
                        (Exports - Imports): Value of goods and services sold to
                        (exports) and bought from (imports) other countries.
                        Forms part of the current account.
                        <br />
                        <br />
                        Trade Surplus: Exports > Imports.
                        <br />
                        Trade Deficit: Imports > Exports.
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Budget Balance
                  </CardTitle>
                  <Gem className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{primeRate?.value}%</div>
                  <p className="text-xs text-muted-foreground">
                    Government Revenue - Expenses.
                    <br />
                    Positive = Budget Surplus (government saves). Negative =
                    Budget Deficit (government borrows).
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Current Account
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{inflationRate}%</div>
                  <p className="text-xs text-muted-foreground">
                    Trade balance + income from abroad + transfers
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Capital Account
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {unemployRate?.currentValue}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Tracks one-time transfers of capital assets (e.g., debt
                    forgiveness, land purchases).
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Financial Account
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {parseFloat(usZarRate).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Tracks investments and financial flows (e.g., foreign direct
                    investment, stock/bond purchases, and reserve assets).
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Balance of Payments{" "}
                  </CardTitle>
                  <TrendingUpDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {realGdpGrowth?.value}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Current account + capital account + financial account.
                    <br />
                    Tracks all economic transactions between a country and the
                    world.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Government Finances</CardTitle>
                  <CardDescription>
                    Debt-to-GDP and Budget Balance
                  </CardDescription>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Foreign Direct Investment
                  </CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${mockData.fdi}B</div>
                  <p className="text-xs text-muted-foreground">Net inflow</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Current Account Balance
                  </CardTitle>
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockData.currentAccountBalance}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    (Government Revenue - Government Expenditure) / GDP
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Poverty Rate
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockData.povertyRate}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Below poverty line
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Human Development Index
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockData.hdi}</div>
                  <p className="text-xs text-muted-foreground">HDI Score</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Labor Force Participation
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockData.laborForceParticipation}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Of working-age population
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Energy Price Index
                  </CardTitle>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockData.energyPriceIndex}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Base year = 100
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Stock Market Index
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockData.stockMarketIndex.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Major stock exchange
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Business Confidence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">
                    {mockData.businessConfidence}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Consumer Confidence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">
                    {mockData.consumerConfidence}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
