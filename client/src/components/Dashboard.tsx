import { useEffect, useState } from "react";
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
import { ModeToggle } from "./ModeToggle";

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
      <header className="bg-background border-b border-border p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">
          South African Macro Dashboard
        </h1>
        <ModeToggle />
      </header>
      <CardContent className="p-6 bg-background">
        <SarbOverview />
        <SarbRepo />
        <div className="grid grid-cols-3 gap-4 p-8">
          <SarbGdp />
          <EconomicSectors />
          <GdpData />
        </div>
        <div className="grid grid-cols-2 gap-4 p-8">
          <SarbResCur />
          <SarbProdEmploy />
        </div>
        <div className="grid grid-cols-2 gap-4 p-8">
          <SarbCashFin />
          <SarbExtFin />
        </div>
      </CardContent>
    </Card>
  );
}
