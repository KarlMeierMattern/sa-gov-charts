import express from "express";
import {
  postSarbGdpData,
  getSarbGdpData,
} from "../controllers/sarbGdpController.js";
import {
  postSarbRepoData,
  getSarbRepoData,
} from "../controllers/sarbRepoController.js";
import {
  postStatsSaController,
  getStatsSaController,
  downloadStats,
} from "../controllers/statSaController.js";
import {
  postSarbOverview,
  getSarbOverview,
} from "../controllers/sarbOverviewController.js";
import {
  postSarbAllData,
  getSarbAllData,
} from "../controllers/sarbAllController.js";
import {
  postSarbOtherIndicatorsController,
  getSarbOtherIndicatorsController,
} from "../controllers/sarbOtherIndicatorsController.js";
import {
  postJseIndex,
  getJseIndex,
} from "../controllers/jseIndexController.js";
import { worldbankController } from "../controllers/worldbankController.js";

const router = express.Router();

// Express.js provides the server framework to handle HTTP requests and responses.
// Axios is used to scrape data from external websites, process it, and send it back to clients.
// Express server exposes scraped data via specific endpoints, effectively functioning as an API.

// SARB GDP
router.post("/sarb-gdp", postSarbGdpData); // call the API and post to database
router.get("/sarb-gdp", getSarbGdpData); // front-end requests data from database to avoid IP ban for scraping too often

// SARB Repo
router.post("/sarb-repo", postSarbRepoData);
router.get("/sarb-repo", getSarbRepoData);

// SARB Overview
router.post("/sarb-overview", postSarbOverview);
router.get("/sarb-overview", getSarbOverview);

// SARB All
router.post("/sarb-all", postSarbAllData);
router.get("/sarb-all", getSarbAllData);

// SARB Other Indicators
router.post("/sarb-other", postSarbOtherIndicatorsController);
router.get("/sarb-other", getSarbOtherIndicatorsController);

// JSE
router.post("/jse", postJseIndex);
router.get("/jse", getJseIndex);

// Stats SA
router.post("/stats-sa", postStatsSaController);
// router.get("/stats-sa", getStatsSaController);
router.get("/stats-sa", downloadStats);

// World Bank
router.get("/world-bank", worldbankController);

export default router;
