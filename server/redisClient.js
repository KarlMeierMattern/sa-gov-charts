import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: { tls: true },
});

redisClient.on("error", (err) => console.error("Redis Error:", err));

export default redisClient;
