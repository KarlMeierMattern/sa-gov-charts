import express from "express";
import { cacheMiddleware } from "../middleware/cacheMiddleware.js";
import { getDashboardData } from "../controllers/dashboardController.js";

import {
  getSarbRepoData,
  getSarbAllData,
  getSarbOtherIndicatorsController,
  getJseIndex,
  getSarbRepoTimelineData,
  getSarbFxTimelineData,
  getSarbRealGdpTimelineData,
  getSarbPrimeTimelineData,
  getSarbChangePrimeTimelineData,
  getSarbChangeRepoTimelineData,
  getSarbGoldTimelineData,
  getSarbGbpTimelineData,
  getSarbEuroTimelineData,
  getUnemployment,
  getUnemploymentTimelineData,
} from "../controllers/index.js";

const router = express.Router();

router.get("/dashboard", cacheMiddleware, getDashboardData);
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
router.get("/unemployment", cacheMiddleware, getUnemployment);
router.get(
  "/unemployment-timeline",
  cacheMiddleware,
  getUnemploymentTimelineData
);

if (process.env.NODE_ENV !== "production") {
  router.get("/test", async (req, res, next) => {
    const { getTest } = await import("../controllers/testController.js");
    return getTest(req, res, next);
  });
}

export default router;
