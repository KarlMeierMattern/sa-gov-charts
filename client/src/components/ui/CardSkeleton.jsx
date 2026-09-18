import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { panelClass, statCardClass } from "@/lib/panelStyles.js";

const ChartSectionSkeleton = () => (
  <div className={panelClass}>
    <div className="h-6 w-48 bg-muted animate-pulse rounded mb-4" />
    <div className="h-[300px] bg-muted/70 animate-pulse rounded-xl" />
  </div>
);

const CardSkeleton = () => {
  return (
    <div className="space-y-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="h-9 w-72 bg-muted animate-pulse rounded" />
          <div className="h-4 w-48 bg-muted animate-pulse rounded mt-2" />
        </div>
        <div className="h-9 w-9 bg-muted animate-pulse rounded" />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(16)].map((_, index) => (
          <Card key={index} className={statCardClass}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              <div className="h-4 w-4 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted animate-pulse rounded mb-2" />
              <div className="h-3 w-32 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <ChartSectionSkeleton key={index} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartSectionSkeleton />
        <ChartSectionSkeleton />
      </div>
    </div>
  );
};

export default CardSkeleton;
