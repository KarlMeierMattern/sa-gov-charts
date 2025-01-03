import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import { Overview } from "@/components/ui/overview";
import { RecentSales } from "@/components/ui/recent-sales";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  TrendingUp,
  Users,
  ArrowUpDown,
  Activity,
  Briefcase,
  Zap,
  BadgeDollarSign,
  CirclePercent,
} from "lucide-react";

// Mock data - replace with real data in a production environment
const mockData = {
  inflationRate: 5.2,
  interestRate: 3.5,
  gdpGrowth: 2.8,
  unemploymentRate: 7.1,
  exchangeRate: 15.23,
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
  const [responseEmploy, setResponseEmploy] = useState(null);

  const [loadingOther, setLoadingOther] = useState(true);
  const [loadingAll, setLoadingAll] = useState(true);

  const [errorOther, setErrorOther] = useState(null);
  const [errorAll, setErrorAll] = useState(null);

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

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoadingAll(true);
        const response = await axios.get("http://localhost:3000/gov/sarb-all");
        setResponseEmploy(response.data);
      } catch (error) {
        console.error(error);
        setErrorAll("Failed to fetch data for SARB All.");
      } finally {
        setLoadingAll(false);
      }
    };

    fetchAllData();
  }, []);

  if (loadingOther || loadingAll) return <div>Loading...</div>;
  if (errorOther) return <div>Error: {errorOther}</div>;
  if (errorAll) return <div>Error: {errorAll}</div>;

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

  const unemployRate = responseEmploy.find(
    (item) =>
      item.sector ===
      "Unemployment rate (nsa)\nPlease see the statement regarding updating of info on the STATS SA website"
  );

  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Economic Dashboard
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Inflation Rate
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{inflationRate}%</div>
                  <p className="text-xs text-muted-foreground">
                    Consumer Price Index (CPI)
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Repo Rate
                  </CardTitle>
                  <CirclePercent className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{repoRate?.value}%</div>
                  <p className="text-xs text-muted-foreground">
                    Key policy rate @ {repoRate.date}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Prime Rate
                  </CardTitle>
                  <CirclePercent className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{primeRate?.value}%</div>
                  <p className="text-xs text-muted-foreground">
                    Key policy rate @ {primeRate?.date}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    GDP Growth
                  </CardTitle>
                  <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {realGdpGrowth?.value}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Real GDP growth rate @ {realGdpGrowth?.date}
                  </p>
                </CardContent>
              </Card>
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
                  <CardDescription>By Expenditure Type</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Currency Exchange Rate</CardTitle>
                  <CardDescription>USD/ZAR FX Rate over time</CardDescription>
                </CardHeader>
                <CardContent className="pl-2"></CardContent>
              </Card>
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
                  <p className="text-xs text-muted-foreground">Of GDP</p>
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
