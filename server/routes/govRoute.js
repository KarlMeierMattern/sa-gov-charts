import express from "express";
import { cacheMiddleware } from "../middleware/cacheMiddleware.js";

import {
  getSarbRepoData,
  getSarbAllData,
  getSarbOtherIndicatorsController,
  getJseIndex,
  getTest,
} from "../controllers/index.js";

const router = express.Router();

router.get("/sarb-repo", cacheMiddleware, getSarbRepoData);
router.get("/sarb-all", cacheMiddleware, getSarbAllData);
router.get("/sarb-other", cacheMiddleware, getSarbOtherIndicatorsController);
router.get("/jse", cacheMiddleware, getJseIndex);
router.get("/test", getTest);

export default router;

// Express.js provides the server framework to handle HTTP requests and responses.
// Axios is used to scrape data from external websites, process it, and send it back to clients.
// Express server exposes scraped data via specific endpoints, effectively functioning as an API.
