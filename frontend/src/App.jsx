import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import SarbRepo from "./SarbRepo";
import SarbGdp from "./SarbGdp";
import WorldBank from "./WorldBank";
import StatsSA from "./StatsSA";

const App = () => {
  return (
    <Routes>
      <Route path="/gov" element={<Home />} />
      <Route path="/gov/sarb-repo" element={<SarbRepo />} />
      <Route path="/gov/sarb-gdp" element={<SarbGdp />} />
      <Route path="/gov/stats-sa" element={<StatsSA />} />
      <Route path="/gov/world-bank" element={<WorldBank />} />
    </Routes>
  );
};

export default App;
