import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WorldBank from "./pages/WorldBank";
import StatsSA from "./pages/StatsSA";
import SarbGdp from "./pages/sarbGdp";
import SarbRepo from "./pages/SarbRepo";
import Test from "./pages/Test";

const App = () => {
  return (
    <Routes>
      <Route path="/gov" element={<Home />} />
      <Route path="/gov/world-bank" element={<WorldBank />} />
      <Route path="/gov/stats-sa" element={<StatsSA />} />
      <Route path="/gov/sarb-gdp" element={<SarbGdp />} />
      <Route path="/gov/sarb-repo" element={<SarbRepo />} />
      <Route path="/gov/test" element={<Test />} />
    </Routes>
  );
};

export default App;
