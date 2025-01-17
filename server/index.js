import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import govRoute from "./routes/govRoute.js";

const app = express();

// Middleware for parsing incoming requests
app.use(express.json());

// CORS setup
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [process.env.ORIGIN_1, process.env.ORIGIN_2]
    : ["http://localhost:5173"];

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("Allowed Origins:", allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Incoming request from origin:", origin);

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Origin rejected:", origin);
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Backend routes
app.use("/", govRoute);

// Connect to MongoDB with fallback URI if not provided
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/defaultDb";
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("App connected to database");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

// Start the server
const PORT = process.env.PORT || 3000; // in production Render automatically assigns PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the app for Vercel
export default app;
