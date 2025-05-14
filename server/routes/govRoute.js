import express from "express";
import { cacheMiddleware } from "../middleware/cacheMiddleware.js";

import {
  getSarbRepoData,
  getSarbAllData,
  getSarbOtherIndicatorsController,
  getJseIndex,
  getTest,
  getSarbRepoTimelineData,
  getSarbFxTimelineData,
  getSarbRealGdpTimelineData,
  getSarbPrimeTimelineData,
  getSarbChangePrimeTimelineData,
  getSarbChangeRepoTimelineData,
  getSarbGoldTimelineData,
  getSarbGbpTimelineData,
  getSarbEuroTimelineData,
} from "../controllers/index.js";

const router = express.Router();

router.get("/sarb-repo", cacheMiddleware, getSarbRepoData);
router.get("/sarb-all", cacheMiddleware, getSarbAllData);
router.get("/sarb-other", cacheMiddleware, getSarbOtherIndicatorsController);
router.get("/jse", cacheMiddleware, getJseIndex);
router.get("/sarb-repo-timeline", cacheMiddleware, getSarbRepoTimelineData);
router.get("/sarb-fx-timeline", cacheMiddleware, getSarbFxTimelineData);
router.get(
  "/sarb-real-gdp-timeline",
  cacheMiddleware,
  getSarbRealGdpTimelineData
);
router.get("/sarb-prime-timeline", cacheMiddleware, getSarbPrimeTimelineData);
router.get(
  "/sarb-change-prime-timeline",
  cacheMiddleware,
  getSarbChangePrimeTimelineData
);
router.get(
  "/sarb-change-repo-timeline",
  cacheMiddleware,
  getSarbChangeRepoTimelineData
);
router.get("/sarb-gold-timeline", cacheMiddleware, getSarbGoldTimelineData);
router.get("/sarb-gbp-timeline", cacheMiddleware, getSarbGbpTimelineData);
router.get("/sarb-euro-timeline", cacheMiddleware, getSarbEuroTimelineData);
router.get("/test", getTest);
export default router;

// Express.js provides the server framework to handle HTTP requests and responses.
// Axios is used to scrape data from external websites, process it, and send it back to clients.
// Express server exposes scraped data via specific endpoints, effectively functioning as an API.
