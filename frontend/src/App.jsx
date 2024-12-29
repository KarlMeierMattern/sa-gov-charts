import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import SarbRepo from "./pages/SarbRepo";
import SarbGdp from "./pages/SarbGdp";
import SarbResCur from "./pages/SarbResCur";
import SarbGdpIndustry from "./pages/SarbGdpIndustry";
import SarbExpCon from "./pages/SarbExpCon";
import SarbProdEmploy from "./pages/SarbProdEmploy";
import SarbCashFin from "./pages/SarbCashFin";
import SarbExtFin from "./pages/SarbExtFin";
// import WorldBank from "./pages/WorldBank";
// import StatsSA from "./pages/StatsSA";

const App = () => {
  return (
    <Routes>
      <Route path="/gov" element={<Home />} />
      <Route path="/gov/sarb-repo" element={<SarbRepo />} />
      <Route path="/gov/sarb-gdp" element={<SarbGdp />} />
      <Route path="/gov/sarb-rescur" element={<SarbResCur />} />
      <Route path="/gov/sarb-gdp-industry" element={<SarbGdpIndustry />} />
      <Route path="/gov/sarb-expcon" element={<SarbExpCon />} />
      <Route path="/gov/sarb-prodemploy" element={<SarbProdEmploy />} />
      <Route path="/gov/sarb-cashfin" element={<SarbCashFin />} />
      <Route path="/gov/sarb-extfin" element={<SarbExtFin />} />
      {/* <Route path="/gov/stats-sa" element={<StatsSA />} /> */}
      {/* <Route path="/gov/world-bank" element={<WorldBank />} /> */}
    </Routes>
  );
};

export default App;
