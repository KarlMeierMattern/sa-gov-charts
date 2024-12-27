import * as React from "react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function Sidebar({
  activeCategory,
  setActiveCategory,
}: SidebarProps) {
  const categories = [
    "Market Rates",
    "GDP",
    "GDP Industry",
    "Expenditure & Consumption",
    "Production & Employment",
    "Cashflow & Financing",
    "External Financing",
    "Reserves & Currencies",
  ];

  return (
    <nav className="w-64 bg-background border-r border-border p-4">
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category}>
            <Button
              variant={activeCategory === category ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
