// Middleware to cache responses

import redisClient from "../redisClient.js";

const CACHE_TIME = 604800;

export const cacheMiddleware = async (req, res, next) => {
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
      redisClient.setEx(key, CACHE_TIME, JSON.stringify(body));
      res.sendResponse(body);
    };
    next();
  } catch (error) {
    console.error("Redis cache error:", error);
    next();
  }
};
