import { Routes, Route } from "react-router-dom";
import ThemeProvider from "@/components/ThemeProvider";
import Dashboard from "./Dashboard";

const App = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
