import * as React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SarbOverview from "../pages/SarbOverview";
import SarbRepo from "../pages/SarbRepo";
import SarbGdp from "../pages/SarbGdp";
import SarbGdpIndustry from "../pages/SarbGdpIndustry";
import SarbExpCon from "../pages/SarbExpCon";
import SarbProdEmploy from "../pages/SarbProdEmploy";
import SarbCashFin from "../pages/SarbCashFin";
import SarbExtFin from "../pages/SarbExtFin";
import SarbResCur from "../pages/SarbResCur";

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

  const renderContent = () => {
    switch (category) {
      case "Overview":
        return <SarbOverview />;
      case "Market Rates":
        return <SarbRepo />;
      case "GDP by Expenditure":
        return <SarbGdp />;
      case "GDP by Industry":
        return <SarbGdpIndustry />;
      case "Expenditure & Consumption":
        return <SarbExpCon />;
      case "Production & Employment":
        return <SarbProdEmploy />;
      case "Cashflow & Financing":
        return <SarbCashFin />;
      case "External Financing":
        return <SarbExtFin />;
      case "Reserves & Currencies":
        return <SarbResCur />;
      default:
        return <div>Select a category</div>;
    }
  };

  return (
    <Card>
      <CardHeader className="border-b border-border">
        <CardTitle>
          {category.charAt(0).toUpperCase() + category.slice(1)} Data
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 bg-background">{renderContent()}</CardContent>
    </Card>
  );
}
