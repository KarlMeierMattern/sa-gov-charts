import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import SarbRepo from "./SarbRepo";
import SarbGdp from "./SarbGdp";
import SarbResCur from "./SarbResCur";
import SarbGdpIndustry from "./SarbGdpIndustry";
import SarbExpCon from "./SarbExpCon";
import SarbProdEmploy from "./SarbProdEmploy";
import SarbCashFin from "./SarbCashFin";
import SarbExtFin from "./SarbExtFin";
import WorldBank from "./WorldBank";
import StatsSA from "./StatsSA";

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
      <Route path="/gov/stats-sa" element={<StatsSA />} />
      <Route path="/gov/world-bank" element={<WorldBank />} />
    </Routes>
  );
};

export default App;
