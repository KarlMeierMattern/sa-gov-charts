import { lazy, Suspense, memo, useEffect } from "react";
import PropTypes from "prop-types";
import { SarbOverview } from "./components/index.js";
import { ModeToggle } from "./components/ModeToggle.tsx";
import CardSkeleton from "./components/ui/CardSkeleton.jsx";
import QuerySection from "./components/QuerySection.jsx";
import { useSarbData } from "../hooks/useSarbData.js";
import Footer from "./components/Footer.jsx";
import { panelClass } from "./lib/panelStyles.js";

const SarbRepo = lazy(() => import("./components/SarbRepo.jsx"));
const TimelineChart = lazy(() => import("./components/TimelineChart.jsx"));
const FxTimelineChart = lazy(() => import("./components/FxTimelineChart.jsx"));
const SarbGdp = lazy(() => import("./components/SarbGdp.jsx"));
const EconomicSectors = lazy(() => import("./components/EconomicSectors.jsx"));
const SarbResCur = lazy(() => import("./components/SarbResCur.jsx"));
const SarbProdEmploy = lazy(() => import("./components/SarbProdEmploy.jsx"));
const SarbCashFin = lazy(() => import("./components/SarbCashFin.jsx"));
const SarbExtFin = lazy(() => import("./components/SarbExtFin.jsx"));

const chartModules = [
  () => import("./components/SarbRepo.jsx"),
  () => import("./components/TimelineChart.jsx"),
  () => import("./components/FxTimelineChart.jsx"),
  () => import("./components/SarbGdp.jsx"),
  () => import("./components/EconomicSectors.jsx"),
  () => import("./components/SarbResCur.jsx"),
  () => import("./components/SarbProdEmploy.jsx"),
  () => import("./components/SarbCashFin.jsx"),
  () => import("./components/SarbExtFin.jsx"),
];

function ChartSectionSkeleton() {
  return (
    <div className={panelClass}>
      <div className="h-6 w-48 bg-muted animate-pulse rounded mb-4" />
      <div className="h-[300px] bg-muted/70 animate-pulse rounded-xl" />
    </div>
  );
}

function ChartSuspense({ children }) {
  return (
    <Suspense fallback={<ChartSectionSkeleton />}>{children}</Suspense>
  );
}

ChartSuspense.propTypes = {
  children: PropTypes.node.isRequired,
};

const DashboardContent = memo(function DashboardContent({ data }) {
  return (
    <div className="space-y-10">
      <SarbOverview
        response={data.sarbOther}
        responseAll={data.sarbAll}
        responseFx={data.sarbRepo}
        responseJse={data.jse}
        responseRepoTimeline={data.sarbRepoTimeline}
        responseRealGdpTimeline={data.sarbRealGdpTimeline}
        responsePrimeTimeline={data.sarbPrimeTimeline}
        responseGoldTimeline={data.sarbGoldTimeline}
        responseFxTimeline={data.sarbFxTimeline}
        responseGbpTimeline={data.sarbGbpTimeline}
        responseEuroTimeline={data.sarbEuroTimeline}
        responseUnemployment={data.unemployment || []}
        responseUnemploymentTimeline={data.unemploymentTimeline || []}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
        <ChartSuspense>
          <SarbRepo response={data.sarbRepo} />
        </ChartSuspense>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartSuspense>
          <TimelineChart
            sarbChangePrimeTimeline={data.sarbChangePrimeTimeline}
            sarbChangeRepoTimeline={data.sarbChangeRepoTimeline}
            responseRealGdpTimeline={data.sarbRealGdpTimeline}
          />
        </ChartSuspense>
        <ChartSuspense>
          <FxTimelineChart
            responseFxTimeline={data.sarbFxTimeline}
            responseGbpTimeline={data.sarbGbpTimeline}
            responseEuroTimeline={data.sarbEuroTimeline}
          />
        </ChartSuspense>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartSuspense>
          <SarbGdp response={data.sarbAll} />
        </ChartSuspense>
        <ChartSuspense>
          <EconomicSectors response={data.sarbAll} />
        </ChartSuspense>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartSuspense>
          <SarbResCur response={data.sarbAll} />
        </ChartSuspense>
        <ChartSuspense>
          <SarbProdEmploy response={data.sarbAll} />
        </ChartSuspense>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartSuspense>
          <SarbCashFin response={data.sarbAll} />
        </ChartSuspense>
        <ChartSuspense>
          <SarbExtFin response={data.sarbAll} />
        </ChartSuspense>
      </div>
    </div>
  );
});

DashboardContent.propTypes = {
  data: PropTypes.object.isRequired,
};

export default function Dashboard() {
  const { query } = useSarbData();

  useEffect(() => {
    if (!query.data) return;
    void Promise.all(chartModules.map((load) => load()));
  }, [query.data]);

  return (
    <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-8">
      <header className="flex items-start justify-between gap-4 mb-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            South Africa Macro Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Tracking South Africa&apos;s economic health
          </p>
        </div>
        <ModeToggle />
      </header>

      <QuerySection queries={query} skeleton={<CardSkeleton />}>
        {query.data && <DashboardContent data={query.data} />}
      </QuerySection>

      <Footer />
    </main>
  );
}
