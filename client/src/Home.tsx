"use client";

import { useState, useEffect } from "react";
import ThemeProvider from "@/components/ThemeProvider";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Overview");

  useEffect(() => {
    console.log("Home component mounted");
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex flex-col min-h-screen bg-background">
        <div className="flex flex-1">
          <main className="flex-1 p-6">
            <Dashboard category={activeCategory} />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
