import redisClient from "../redisClient.js";

const CACHE_TIME = 604800;

export const cacheMiddleware = async (req, res, next) => {
  const key = req.originalUrl;
  try {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      console.log(`Cache hit for ${key}`);
      return res.json(cachedData);
    }
    console.log(`Cache miss for ${key}`);
    res.sendResponse = res.json;
    res.json = (body) => {
      redisClient.set(key, body, { ex: CACHE_TIME });
      res.sendResponse(body);
    };
    next();
  } catch (error) {
    console.error("Redis cache error:", error);
    next();
  }
};
