import express from "express";
import {
  postSarbGdpData,
  getSarbGdpData,
} from "../controllers/sarbGdpController.js";
import { sarbRepoController } from "../controllers/sarbRepoController.js";
import { statssaController } from "../controllers/statssaController.js";
import { worldbankController } from "../controllers/worldbankController.js";

const router = express.Router();

// SARB
router.post("/sarb-gdp", postSarbGdpData); // call the API and post to database
router.get("/sarb-gdp", getSarbGdpData); // front-end requests data from database to avoid IP ban for scraping too often
router.get("/sarb-repo", sarbRepoController);

// Worl Bank
router.get("/world-bank", worldbankController);

// Stats SA
router.get("/stats-sa", statssaController);

export default router;
