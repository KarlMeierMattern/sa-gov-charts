import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const redisClient = createClient({
  url:
    process.env.NODE_ENV === "development"
      ? process.env.REDIS_URL_DEV
      : process.env.REDIS_URL_PROD,
  socket: { tls: process.env.NODE_ENV === "development" ? true : false },
});

redisClient.on("error", (err) => console.error("Redis Error:", err));
redisClient.on("connect", () => console.log("Redis client connected"));
redisClient.on("ready", () => console.log("Redis client ready"));
redisClient.on("end", () => console.log("Redis client connection closed"));

export default redisClient;
