import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ChartSectionSkeleton = () => (
  <div className="p-4 border rounded-2xl shadow">
    <div className="h-6 w-48 bg-muted animate-pulse rounded mb-4" />
    <div className="h-[300px] bg-muted animate-pulse rounded" />
  </div>
);

const CardSkeleton = () => {
  return (
    <Card>
      <header className="flex bg-background border-b border-border p-4 justify-between items-center">
        <div>
          <div className="h-8 w-64 bg-muted animate-pulse rounded" />
          <div className="h-4 w-48 bg-muted animate-pulse rounded mt-2" />
        </div>
        <div className="h-9 w-9 bg-muted animate-pulse rounded" />
      </header>
      <CardContent className="p-6 bg-background space-y-6">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(16)].map((_, index) => (
            <Card key={index}>
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
      </CardContent>
    </Card>
  );
};

export default CardSkeleton;
