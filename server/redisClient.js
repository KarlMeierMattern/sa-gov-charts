import { Redis } from "@upstash/redis";

// HTTP-based REST client. Stateless: every command is a single HTTPS call,
// no TCP handshake, no connection lifecycle. Reads UPSTASH_REDIS_REST_URL
// and UPSTASH_REDIS_REST_TOKEN from the environment.
const redisClient = Redis.fromEnv();

export default redisClient;
