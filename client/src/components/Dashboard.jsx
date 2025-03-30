import { useEffect, useState } from "react";
import axios from "axios";
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
} from "./index.js";
import { ModeToggle } from "./ModeToggle.tsx";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl =
    import.meta.env.VITE_ENV === "development"
      ? import.meta.env.VITE_DEV_BASE_URL
      : import.meta.env.VITE_PROD_BASE_URL;

  axios.defaults.baseURL = baseUrl;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [otherResponse, allResponse, fxResponse, jseResponse] =
          await Promise.all([
            axios.get("/sarb-other"),
            axios.get("/sarb-all"),
            axios.get("/sarb-repo"),
            axios.get("/jse"),
          ]);
        setData({
          response: otherResponse.data,
          responseAll: allResponse.data,
          responseFx: fxResponse.data,
          responseJse: jseResponse.data,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8">Error: {error}</div>;
  }

  return (
    <Card>
      <header className="bg-background border-b border-border p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">
          South African Macro Dashboard
        </h1>
        <ModeToggle />
      </header>
      <CardContent className="p-6 bg-background">
        <SarbOverview
          response={data.response}
          responseAll={data.responseAll}
          responseFx={data.responseFx}
          responseJse={data.responseJse}
        />
        <SarbRepo response={data.responseFx} />
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 p-8 overflow-hidden">
          <div>
            <SarbGdp response={data.responseAll} />
            <div className="mb-4"></div>{" "}
            {/* Added gap between SarbGdp and GdpData */}
            <GdpData response={data.responseAll} />
          </div>
          <EconomicSectors response={data.responseAll} />
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 p-8">
          <SarbResCur response={data.responseAll} />
          <SarbProdEmploy response={data.responseAll} />
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 p-8">
          <SarbCashFin response={data.responseAll} />
          <SarbExtFin response={data.responseAll} />
        </div>
      </CardContent>
    </Card>
  );
}
