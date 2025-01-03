"use client";

import * as React from "react";
import { useState } from "react";
import ThemeProvider from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Overview");

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <div className="flex flex-1">
          <Sidebar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <main className="flex-1 p-6">
            <Dashboard category={activeCategory} />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
