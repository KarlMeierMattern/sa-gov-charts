import * as React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SarbRepo from "../SarbRepo";
import SarbGdp from "../SarbGdp";

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
      case "Market Rates":
        return <SarbRepo />;
      case "GDP":
        return <SarbGdp />;
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
