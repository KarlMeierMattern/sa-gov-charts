import { Card, CardContent } from "@/components/ui/card";
import {
  SarbOverview,
  SarbRepo,
  SarbGdp,
  EconomicSectors,
  SarbProdEmploy,
  SarbCashFin,
  SarbResCur,
  SarbExtFin,
  GdpData,
  TimelineChart,
} from "./components/index.js";
import { ModeToggle } from "./components/ModeToggle.tsx";
import CardSkeleton from "./components/ui/CardSkeleton.jsx";
import { useSarbData } from "../hooks/useSarbData.js";
import Footer from "./components/Footer.jsx";

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
  } = useSarbData();

  if (
    sarbOther.isLoading ||
    sarbAll.isLoading ||
    sarbRepo.isLoading ||
    sarbJse.isLoading ||
    sarbRepoTimeline.isLoading ||
    sarbFxTimeline.isLoading ||
    sarbRealGdpTimeline.isLoading ||
    sarbPrimeTimeline.isLoading ||
    sarbChangePrimeTimeline.isLoading ||
    sarbChangeRepoTimeline.isLoading ||
    sarbGoldTimeline.isLoading ||
    sarbGbpTimeline.isLoading ||
    sarbEuroTimeline.isLoading
  ) {
    return <CardSkeleton />;
  }

  if (
    sarbOther.error ||
    sarbAll.error ||
    sarbRepo.error ||
    sarbJse.error ||
    sarbRepoTimeline.error ||
    sarbFxTimeline.error ||
    sarbRealGdpTimeline.error ||
    sarbPrimeTimeline.error ||
    sarbChangePrimeTimeline.error ||
    sarbChangeRepoTimeline.error ||
    sarbGoldTimeline.error ||
    sarbGbpTimeline.error ||
    sarbEuroTimeline.error
  ) {
    return (
      <div className="text-center mt-8">
        Error:{" "}
        {sarbOther.error?.message ||
          sarbAll.error?.message ||
          sarbRepo.error?.message ||
          sarbJse.error?.message ||
          sarbRepoTimeline.error?.message ||
          sarbFxTimeline.error?.message ||
          sarbRealGdpTimeline.error?.message ||
          sarbPrimeTimeline.error?.message ||
          sarbChangePrimeTimeline.error?.message ||
          sarbChangeRepoTimeline.error?.message ||
          sarbGoldTimeline.error?.message ||
          sarbGbpTimeline.error?.message ||
          sarbEuroTimeline.error?.message}
      </div>
    );
  }

  return (
    <Card className="mb-20">
      <header className="flex bg-background border-b border-border p-4 justify-between items-center">
        <div className="flex-row">
          <h1 className="text-2xl font-bold text-foreground">
            South Africa Macro Dashboard
          </h1>
          <p className="text-sm text-gray-500 italic">
            Tracking South Africa&apos;s economic health
          </p>
        </div>
        <ModeToggle />
      </header>
      <CardContent className="p-6 bg-background">
        <SarbOverview
          response={sarbOther.data}
          responseAll={sarbAll.data}
          responseFx={sarbRepo.data}
          responseJse={sarbJse.data}
          responseRepoTimeline={sarbRepoTimeline.data}
          responseFxTimeline={sarbFxTimeline.data}
          responseRealGdpTimeline={sarbRealGdpTimeline.data}
          responsePrimeTimeline={sarbPrimeTimeline.data}
          responseGoldTimeline={sarbGoldTimeline.data}
          responseGbpTimeline={sarbGbpTimeline.data}
          responseEuroTimeline={sarbEuroTimeline.data}
        />
        <SarbRepo response={sarbRepo.data} />
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 p-8 overflow-hidden">
          <div>
            <SarbGdp response={sarbAll.data} />
            <div className="mb-4"></div>
            <GdpData response={sarbAll.data} />
          </div>
          <EconomicSectors response={sarbAll.data} />
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 p-8">
          <SarbResCur response={sarbAll.data} />
          <SarbProdEmploy response={sarbAll.data} />
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 p-8">
          <SarbCashFin response={sarbAll.data} />
          <SarbExtFin response={sarbAll.data} />
        </div>
        <div className="grid grid-cols-1 gap-4 p-8">
          <TimelineChart
            sarbChangePrimeTimeline={sarbChangePrimeTimeline.data}
            sarbChangeRepoTimeline={sarbChangeRepoTimeline.data}
            responseRealGdpTimeline={sarbRealGdpTimeline.data}
          />
        </div>
      </CardContent>
      <Footer />
    </Card>
  );
}
