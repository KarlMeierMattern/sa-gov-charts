import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

// node-redis v4 auto-detects TLS when the URL uses the `rediss://` scheme,
// so no explicit socket.tls config is required.
const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => console.error("Redis Error:", err));
redisClient.on("connect", () => console.log("Redis client connected"));
redisClient.on("ready", () => console.log("Redis client ready"));
redisClient.on("end", () => console.log("Redis client connection closed"));

export default redisClient;
