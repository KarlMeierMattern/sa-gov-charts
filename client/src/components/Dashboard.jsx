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
import "@fortawesome/fontawesome-free/css/all.min.css";

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
    return (
      <div className="text-center mt-8">
        <i className="fa-regular fa-heart fa-beat-fade"></i>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-8">Error: {error}</div>;
  }

  return (
    <Card>
      <header className="flex bg-background border-b border-border p-4 justify-between items-center">
        <div className="flex-row">
          <h1 className="text-2xl font-bold text-foreground">
            South African Macro Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Visualising important indicators of the health of the SA economy
          </p>
          <p className="text-sm text-gray-500">
            Data provided by{" "}
            <a
              href="https://www.resbank.co.za/en/home"
              className=" underline text-red-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              SARB
            </a>
            , updated weekly
          </p>
        </div>
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
      <footer>
        <div className="fixed bottom-0 left-0 w-full bg-black text-white p-4 text-center">
          <p>
            Built by{" "}
            <a
              className="underline text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/karl-alexander-meier-mattern-ca-sa-16a3b919a/"
            >
              Karl-Alexander
            </a>{" "}
            with 💜
          </p>
        </div>
      </footer>
    </Card>
  );
}
