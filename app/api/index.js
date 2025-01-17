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
app.use(cors());

app.use("/gov", govRoute);

app.get("/", (req, res) => {
  return res.status(200).send("Hello World");
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

// Export the app for Vercel
export default app;
