import ThemeProvider from "@/components/ThemeProvider";
import Dashboard from "./Dashboard";

const App = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Dashboard />
    </ThemeProvider>
  );
};

export default App;
