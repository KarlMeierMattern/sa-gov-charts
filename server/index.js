import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import govRoute from "./routes/govRoute.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";
import redisClient from "./redisClient.js";

dotenv.config();

console.log("ORIGIN_1:", process.env.ORIGIN_1 ? "✅ Set" : "❌ Missing");
console.log("ORIGIN_2:", process.env.ORIGIN_2 ? "✅ Set" : "❌ Missing");
console.log(
  "REDIS_URL:",
  process.env.NODE_ENV === "development"
    ? process.env.REDIS_URL_DEV
      ? "✅ Dev Set"
      : "❌ Dev Missing"
    : process.env.REDIS_URL_PROD
    ? "✅ Prod Set"
    : "❌ Prod Missing"
);
console.log(
  "MONGO_URI:",
  process.env.NODE_ENV === "development"
    ? process.env.MONGO_URI_DEV
      ? "✅ Dev Set"
      : "❌ Dev Missing"
    : process.env.MONGO_URI_PROD
    ? "✅ Prod Set"
    : "❌ Prod Missing"
);

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

// Connect to Redis
(async () => {
  await redisClient.connect();
  console.log(
    process.env.NODE_ENV === "development"
      ? "Connected to Upstash Redis ✅"
      : "Connected to VPS Redis ✅"
  );
})();

// Apply routes
app.use("/", govRoute);

// Error handler middleware (must be last)
app.use(errorHandlerMiddleware);

// Connect to MongoDB with fallback URI if not provided
const mongoUri =
  process.env.NODE_ENV === "development"
    ? process.env.MONGO_URI_DEV
    : process.env.MONGO_URI_PROD;

// In production Render automatically assigns PORT
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await mongoose.connect(mongoUri, {
      // Connection pooling optimization
      maxPoolSize: 10, // Maximum number of connections in the pool
      minPoolSize: 2, // Minimum number of connections in the pool
      maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
      serverSelectionTimeoutMS: 5000, // Timeout for server selection
      socketTimeoutMS: 45000, // Socket timeout
      bufferCommands: false, // Disable mongoose buffering for better performance
    });
    console.log(
      process.env.NODE_ENV === "development"
        ? "App connected to local database ✅"
        : "App connected to VPS database ✅"
    );
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
      if (process.env.NODE_ENV === "production") {
        console.log("==> Your service is live in production 🎉");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

start();

// Export the app for Vercel
export default app;
