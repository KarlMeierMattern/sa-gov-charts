import { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { Card, CardContent } from "@/components/ui/card";
import { SarbOverview } from "./components/index.js";
import { ModeToggle } from "./components/ModeToggle.tsx";
import CardSkeleton from "./components/ui/CardSkeleton.jsx";
import QuerySection from "./components/QuerySection.jsx";
import { useSarbData } from "../hooks/useSarbData.js";
import Footer from "./components/Footer.jsx";

const SarbRepo = lazy(() => import("./components/SarbRepo.jsx"));
const TimelineChart = lazy(() => import("./components/TimelineChart.jsx"));
const FxTimelineChart = lazy(() => import("./components/FxTimelineChart.jsx"));
const SarbGdp = lazy(() => import("./components/SarbGdp.jsx"));
const EconomicSectors = lazy(() => import("./components/EconomicSectors.jsx"));
const SarbResCur = lazy(() => import("./components/SarbResCur.jsx"));
const SarbProdEmploy = lazy(() => import("./components/SarbProdEmploy.jsx"));
const SarbCashFin = lazy(() => import("./components/SarbCashFin.jsx"));
const SarbExtFin = lazy(() => import("./components/SarbExtFin.jsx"));

function ChartSectionSkeleton() {
  return (
    <div className="p-4 border rounded-2xl shadow">
      <div className="h-6 w-48 bg-muted animate-pulse rounded mb-4" />
      <div className="h-[300px] bg-muted animate-pulse rounded" />
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

export default function Dashboard() {
  const {
    sarbOther,
    sarbAll,
    sarbRepo,
    sarbJse,
    sarbRepoTimeline,
    sarbFxTimeline,
    sarbRealGdpTimeline,
    sarbPrimeTimeline,
    sarbChangePrimeTimeline,
    sarbChangeRepoTimeline,
    sarbGoldTimeline,
    sarbGbpTimeline,
    sarbEuroTimeline,
    sarbUnemployment,
    sarbUnemploymentTimeline,
  } = useSarbData();

  const overviewQueries = [
    sarbOther,
    sarbAll,
    sarbRepo,
    sarbJse,
    sarbRepoTimeline,
    sarbFxTimeline,
    sarbRealGdpTimeline,
    sarbPrimeTimeline,
    sarbGoldTimeline,
    sarbGbpTimeline,
    sarbEuroTimeline,
    sarbUnemployment,
    sarbUnemploymentTimeline,
  ];

  return (
    <main id="main-content" className="max-w-7xl mx-auto px-4 pb-24">
      <Card className="mb-8">
        <header className="flex bg-background border-b border-border p-4 justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              South Africa Macro Dashboard
            </h1>
            <p className="text-sm text-muted-foreground italic">
              Tracking South Africa&apos;s economic health
            </p>
          </div>
          <ModeToggle />
        </header>
        <CardContent className="p-6 bg-background space-y-6">
          <QuerySection queries={overviewQueries} skeleton={<CardSkeleton />}>
            <div className="px-2 lg:px-4">
              <SarbOverview
                response={sarbOther.data}
                responseAll={sarbAll.data}
                responseFx={sarbRepo.data}
                responseJse={sarbJse.data}
                responseRepoTimeline={sarbRepoTimeline.data}
                responseRealGdpTimeline={sarbRealGdpTimeline.data}
                responsePrimeTimeline={sarbPrimeTimeline.data}
                responseGoldTimeline={sarbGoldTimeline.data}
                responseFxTimeline={sarbFxTimeline.data}
                responseGbpTimeline={sarbGbpTimeline.data}
                responseEuroTimeline={sarbEuroTimeline.data}
                responseUnemployment={sarbUnemployment.data || []}
                responseUnemploymentTimeline={
                  sarbUnemploymentTimeline.data || []
                }
              />
            </div>
          </QuerySection>

          <QuerySection
            queries={sarbRepo}
            skeleton={
              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4 px-2 lg:px-4">
                {[...Array(4)].map((_, index) => (
                  <ChartSectionSkeleton key={index} />
                ))}
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4 px-2 lg:px-4">
              <ChartSuspense>
                <SarbRepo response={sarbRepo.data} />
              </ChartSuspense>
            </div>
          </QuerySection>

          <QuerySection
            queries={[
              sarbChangePrimeTimeline,
              sarbChangeRepoTimeline,
              sarbRealGdpTimeline,
              sarbFxTimeline,
              sarbGbpTimeline,
              sarbEuroTimeline,
            ]}
            skeleton={
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-2 lg:px-4">
                <ChartSectionSkeleton />
                <ChartSectionSkeleton />
              </div>
            }
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-2 lg:px-4">
              <ChartSuspense>
                <TimelineChart
                  sarbChangePrimeTimeline={sarbChangePrimeTimeline.data}
                  sarbChangeRepoTimeline={sarbChangeRepoTimeline.data}
                  responseRealGdpTimeline={sarbRealGdpTimeline.data}
                />
              </ChartSuspense>
              <ChartSuspense>
                <FxTimelineChart
                  responseFxTimeline={sarbFxTimeline.data}
                  responseGbpTimeline={sarbGbpTimeline.data}
                  responseEuroTimeline={sarbEuroTimeline.data}
                />
              </ChartSuspense>
            </div>
          </QuerySection>

          <QuerySection
            queries={sarbAll}
            skeleton={
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-2 lg:px-4">
                <ChartSectionSkeleton />
                <ChartSectionSkeleton />
              </div>
            }
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-2 lg:px-4">
              <ChartSuspense>
                <SarbGdp response={sarbAll.data} />
              </ChartSuspense>
              <ChartSuspense>
                <EconomicSectors response={sarbAll.data} />
              </ChartSuspense>
            </div>
          </QuerySection>

          <QuerySection
            queries={sarbAll}
            skeleton={
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-2 lg:px-4">
                <ChartSectionSkeleton />
                <ChartSectionSkeleton />
              </div>
            }
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-2 lg:px-4">
              <ChartSuspense>
                <SarbResCur response={sarbAll.data} />
              </ChartSuspense>
              <ChartSuspense>
                <SarbProdEmploy response={sarbAll.data} />
              </ChartSuspense>
            </div>
          </QuerySection>

          <QuerySection
            queries={sarbAll}
            skeleton={
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-2 lg:px-4">
                <ChartSectionSkeleton />
                <ChartSectionSkeleton />
              </div>
            }
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-2 lg:px-4">
              <ChartSuspense>
                <SarbCashFin response={sarbAll.data} />
              </ChartSuspense>
              <ChartSuspense>
                <SarbExtFin response={sarbAll.data} />
              </ChartSuspense>
            </div>
          </QuerySection>
        </CardContent>
        <Footer />
      </Card>
    </main>
  );
}
