import express from "express";

import { getSarbRepoData } from "../controllers/sarbRepoController.js";
import { getSarbAllData } from "../controllers/sarbAllController.js";
import { getSarbOtherIndicatorsController } from "../controllers/sarbOtherIndicatorsController.js";
import { getJseIndex } from "../controllers/jseIndexController.js";

const router = express.Router();

router.get("/sarb-repo", getSarbRepoData);
router.get("/sarb-all", getSarbAllData);
router.get("/sarb-other", getSarbOtherIndicatorsController);
router.get("/jse", getJseIndex);

export default router;

// Express.js provides the server framework to handle HTTP requests and responses.
// Axios is used to scrape data from external websites, process it, and send it back to clients.
// Express server exposes scraped data via specific endpoints, effectively functioning as an API.
