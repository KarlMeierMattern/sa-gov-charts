import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import govRoute from "./routes/govRoute.js";

const app = express();

// Middleware for parsing incoming requests
app.use(express.json());

// Allow resource sharing
app.use(cors());

// Backend routes (Make sure these come **before** static files middleware)
app.use("/", govRoute);

// Serve static files from the frontend's `dist` directory
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Fallback route for all other frontend routes (e.g., React routes like `/sarb-overview`)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("App connected to database");
  })
  .catch((error) => {
    console.log("Database connection error:", error);
  });

// Start the server (for local testing)
if (process.env.NODE_ENV !== "production") {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export the app for Vercel
export default app;
