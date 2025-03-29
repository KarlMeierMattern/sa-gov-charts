import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  SarbOverview,
  SarbRepo,
  SarbGdp,
  SarbGdpIndustry,
  SarbProdEmploy,
  SarbCashFin,
  SarbResCur,
  SarbExtFin,
} from "../pages/index.js";

interface DashboardProps {
  category: string;
}

export default function Dashboard({ category }: DashboardProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  }, [category]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <Card>
      <CardContent className="p-6 bg-background">
        <SarbOverview />
        <SarbRepo />
        <div className="flex flex-row">
          <SarbGdp />
          <SarbGdpIndustry />
        </div>
        <SarbResCur />
        <SarbProdEmploy />
        <div className="flex flex-row">
          <SarbCashFin />
          <SarbExtFin />
        </div>
      </CardContent>
    </Card>
  );
}
