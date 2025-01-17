import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import govRoute from "./routes/govRoute.js";

const app = express();

// Middleware for parsing incoming requests
app.use(express.json());

// Allow resource sharing
const prodOrigins = [process.env.ORIGIN_1, process.env.ORIGIN_2];
const devOrigin = ["http://localhost:5173"];
const allowedOrigins =
  process.env.NODE_ENV === "production" ? prodOrigins : devOrigin;
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Backend routes (Make sure these come **before** static files middleware)
app.use("/", govRoute);

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
  // NODE_ENV automatically set by Vercel during deployment, no need to add to .env
  const PORT = process.env.PORT || 3001; // Default to 3001 if not specified in .env
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export the app for Vercel
export default app;
