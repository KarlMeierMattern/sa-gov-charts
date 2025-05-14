"use client";

import ThemeProvider from "@/components/ThemeProvider";
import Dashboard from "@/Dashboard";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex flex-col min-h-screen bg-background">
        <div className="flex flex-1">
          <main className="flex-1 p-6">
            <Dashboard />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
