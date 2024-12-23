import express from "express";
import {
  postSarbGdpData,
  getSarbGdpData,
} from "../controllers/sarbGdpController.js";
import {
  postSarbRepoData,
  getSarbRepoData,
} from "../controllers/sarbRepoController.js";
import { statssaController } from "../controllers/statssaController.js";
import { worldbankController } from "../controllers/worldbankController.js";

const router = express.Router();

// SARB GDP
router.post("/sarb-gdp", postSarbGdpData); // call the API and post to database
router.get("/sarb-gdp", getSarbGdpData); // front-end requests data from database to avoid IP ban for scraping too often

// SARB Repo
router.post("/sarb-repo", postSarbRepoData);
router.get("/sarb-repo", getSarbRepoData);

// Worl Bank
router.get("/world-bank", worldbankController);

// Stats SA
router.get("/stats-sa", statssaController);

export default router;
