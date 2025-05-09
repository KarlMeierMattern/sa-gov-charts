import { Card, CardContent, CardHeader } from "@/components/ui/card";

const CardSkeleton = () => {
  return (
    <Card>
      <header className="flex bg-background border-b border-border p-4 justify-between items-center">
        <div className="flex-row">
          <div className="h-8 w-64 bg-muted animate-pulse rounded" />
          <div className="h-4 w-48 bg-muted animate-pulse rounded mt-2" />
        </div>
      </header>
      <CardContent className="p-6 bg-background">
        <div className="flex-col md:flex">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <div className="h-8 w-32 bg-muted animate-pulse rounded" />
            </div>

            {/* Overview Cards Skeleton */}
            <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(16)].map((_, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                    <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-8 w-16 bg-muted animate-pulse rounded mb-2" />
                    <div className="flex flex-row justify-between">
                      <div className="h-3 w-32 bg-muted animate-pulse rounded" />
                      <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Chart Grid Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-8">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="p-4 border rounded shadow">
              <div className="h-6 w-32 bg-muted animate-pulse rounded mb-4" />
              <div className="h-48 bg-muted animate-pulse rounded" />
            </div>
          ))}
        </div>

        {/* GDP and Economic Sectors Skeleton */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 p-8 overflow-hidden">
          <div>
            <div className="p-4 border rounded shadow">
              <div className="h-6 w-64 bg-muted animate-pulse rounded mb-4" />
              <div className="h-48 bg-muted animate-pulse rounded" />
            </div>
            <div className="mb-4"></div>
            <div className="p-4 border rounded shadow">
              <div className="h-6 w-32 bg-muted animate-pulse rounded mb-4" />
              <div className="h-48 bg-muted animate-pulse rounded" />
            </div>
          </div>
          <div className="p-4 border rounded shadow">
            <div className="h-6 w-40 bg-muted animate-pulse rounded mb-4" />
            <div className="h-96 bg-muted animate-pulse rounded" />
          </div>
        </div>

        {/* Reserves and Production Skeleton */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 p-8">
          <div className="p-4 border rounded shadow">
            <div className="h-6 w-64 bg-muted animate-pulse rounded mb-4" />
            <div className="h-48 bg-muted animate-pulse rounded" />
          </div>
          <div className="p-4 border rounded shadow">
            <div className="h-6 w-48 bg-muted animate-pulse rounded mb-4" />
            <div className="h-48 bg-muted animate-pulse rounded" />
          </div>
        </div>

        {/* Cash Flow and Balance of Payments Skeleton */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 p-8">
          <div className="p-4 border rounded shadow">
            <div className="h-6 w-40 bg-muted animate-pulse rounded mb-4" />
            <div className="h-48 bg-muted animate-pulse rounded" />
          </div>
          <div className="p-4 border rounded shadow">
            <div className="h-6 w-40 bg-muted animate-pulse rounded mb-4" />
            <div className="h-48 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardSkeleton;
