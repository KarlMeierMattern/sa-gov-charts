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

const port = process.env.PORT || 3001;

app.use("/gov", govRoute);

app.get("/", (req, res) => {
  return res.status(200).send("Hello World");
});

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("App connected to database");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.log(error);
}
