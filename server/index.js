import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import govRoute from "./routes/govRoute.js";
import { login } from "./controllers/login.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";
import cookieParser from "cookie-parser";
import { authenticateJWT } from "./middleware/auth.js";

const app = express();

// Middleware for parsing incoming requests
app.use(express.json());

// JWT authentication using HTTP-only cookies
app.use(cookieParser());

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

// Routes
app.post("/login", login); // Public route
app.use("/", authenticateJWT, govRoute); // Protected route

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
