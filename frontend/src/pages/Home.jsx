import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Link className="underline text-blue-600" to="/gov/world-bank">
        World Bank Data
      </Link>
      <Link className="underline text-blue-600" to="/gov/stats-sa">
        Stats SA
      </Link>
      <Link className="underline text-blue-600" to="/gov/sarb-gdp">
        SARB GDP Data
      </Link>
    </div>
  );
};

export default Home;
