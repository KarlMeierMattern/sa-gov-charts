// Middleware to cache responses

import redisClient from "../redisClient.js";

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
      redisClient.setEx(key, 604800, JSON.stringify(body)); // Cache for 1 week
      res.sendResponse(body);
    };
    next();
  } catch (error) {
    console.error("Redis cache error:", error);
    next();
  }
};
