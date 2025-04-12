import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { createClient } from "redis";
import govRoute from "./routes/govRoute.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";

dotenv.config();

const app = express();

// Middleware for parsing incoming requests
app.use(express.json());

// CORS setup
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [
        process.env.ORIGIN_1,
        process.env.ORIGIN_2,
        process.env.ORIGIN_3,
        process.env.ORIGIN_4,
      ]
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

// Redis setup
const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    tls: true, // Enables TLS for secure connection
  },
});

redisClient.on("error", (err) => console.error("Redis Error:", err));

(async () => {
  await redisClient.connect();
  console.log("Connected to Upstash Redis ✅");
})();

// Middleware to cache responses
const cacheMiddleware = async (req, res, next) => {
  const key = req.originalUrl;
  try {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      console.log(`Cache hit for ${key}`);
      return res.json(JSON.parse(cachedData));
    }
    console.log(`Cache miss for ${key}`);
    res.sendResponse = res.json;
    res.json = (body) => {
      redisClient.setEx(key, 3600, JSON.stringify(body)); // Cache for 1 hour
      res.sendResponse(body);
    };
    next();
  } catch (error) {
    console.error("Redis cache error:", error);
    next();
  }
};

// Add a response for the base route "/"
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API!" });
});

// Apply cache middleware to all API routes
app.use("/", cacheMiddleware, govRoute);

// Error handler middleware (must be last)
app.use(errorHandlerMiddleware);

// Connect to MongoDB with fallback URI if not provided
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/defaultDb";

// In production Render automatically assigns PORT
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("App connected to database ✅");
    app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT} 🚀`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

// Export the app for Vercel
export default app;
