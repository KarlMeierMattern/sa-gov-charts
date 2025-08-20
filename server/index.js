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

// Go back to using cors middleware
// Add middleware to log all requests
app.use((req, res, next) => {
  console.log(
    "Debug - Full request headers:",
    JSON.stringify(req.headers, null, 2)
  );
  console.log("Debug - Protocol:", req.protocol);
  console.log("Debug - X-Forwarded-Proto:", req.headers["x-forwarded-proto"]);
  next();
});

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Debug - Allowed origins:", allowedOrigins);
      console.log("Debug - Incoming origin:", origin);

      // Check if origin is in allowed list
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin || true);
      } else {
        console.log("Origin rejected:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Accept"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
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
