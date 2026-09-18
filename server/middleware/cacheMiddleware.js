import redisClient from "../redisClient.js";

const CACHE_TIME = 604800;
const CACHE_CONTROL =
  "public, max-age=300, s-maxage=604800, stale-while-revalidate=86400";

export const cacheMiddleware = async (req, res, next) => {
  const key = req.originalUrl;
  res.setHeader("Cache-Control", CACHE_CONTROL);

  try {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      return res.json(cachedData);
    }

    const originalJson = res.json.bind(res);
    res.json = (body) => {
      originalJson(body);
      void redisClient
        .set(key, body, { ex: CACHE_TIME })
        .catch((error) => console.error("Redis cache write error:", error));
      return res;
    };
    next();
  } catch (error) {
    console.error("Redis cache error:", error);
    next();
  }
};
