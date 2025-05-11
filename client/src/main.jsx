// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import QueryClientProvider from "../providers.jsx";

createRoot(document.getElementById("root")).render(
  <QueryClientProvider>
    <BrowserRouter>
      <App />
      <Analytics />
    </BrowserRouter>
  </QueryClientProvider>
);
