import express from "express";
import cors from "cors";
import govRoute from "./routes/govRoute.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";

const app = express();

app.use(express.json());

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [process.env.ORIGIN_1, process.env.ORIGIN_2].filter(Boolean)
    : ["http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
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
  }),
);

app.use("/", govRoute);

app.use(errorHandlerMiddleware);

export default app;
