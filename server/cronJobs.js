import mongoose from "mongoose";
import dotenv from "dotenv";
import { jseIndex } from "../model/jseIndexModel.js";
import { allSarbSchema } from "../model/sarbAllModel.js";
import { sarbGdpSchema } from "../model/sarbGdpModel.js";
import { sarbOtherIndicatorsSchema } from "../model/sarbOtherIndicators.js";
import { sarbRepoSchema } from "../model/sarbRepoModel.js";
import jseIndexScraper from "./scraping/jseIndexScraper.js";
import sarbAllScraper from "./scraping/sarbAllScraper.js";
import sarbGdpScraper from "./scraping/sarbGdpScraper.js";
import sarbOtherIndicatorsScraper from "./scraping/sarbOtherIndicatorsScraper.js";
import sarbRepoScraper from "./scraping/sarbRepoScraper.js";

dotenv.config();

async function connectToDatabase() {
  const mongoUri =
    process.env.MONGO_URI || "mongodb://localhost:27017/defaultDb";
  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB");
}

async function disconnectFromDatabase() {
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
}

async function retryOperation(operation, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      if (attempt === retries) throw error;
    }
  }
}

async function clearAndUpdateJSE() {
  await retryOperation(async () => {
    console.log("Clearing JSE Index collection...");
    await jseIndex.deleteMany({});

    console.log("Scraping new JSE Index data...");
    const scrapedData = await jseIndexScraper(process.env.JSE);
    if (!Array.isArray(scrapedData) || scrapedData.length === 0) {
      throw new Error("Scraped data is invalid or empty");
    }

    console.log("Inserting new JSE Index data...");
    await jseIndex.insertMany(scrapedData);

    console.log("JSE Index collection updated successfully");
  });
}

async function clearAndUpdateSarbAll() {
  await retryOperation(async () => {
    console.log("Clearing SARB All collection...");
    await allSarbSchema.deleteMany({});

    console.log("Scraping new SARB All data...");
    const scrapedData = await sarbAllScraper(process.env.SARB_ALL);
    if (!Array.isArray(scrapedData) || scrapedData.length === 0) {
      throw new Error("Scraped data is invalid or empty");
    }

    console.log("Inserting new SARB All data...");
    await allSarbSchema.insertMany(scrapedData);

    console.log("SARB All collection updated successfully");
  });
}

async function clearAndUpdateSarbGdp() {
  await retryOperation(async () => {
    console.log("Clearing SARB GDP collection...");
    await sarbGdpSchema.deleteMany({});

    console.log("Scraping new SARB GDP data...");
    const scrapedData = await sarbGdpScraper(process.env.SARB_GDP_URL);
    if (!Array.isArray(scrapedData) || scrapedData.length === 0) {
      throw new Error("Scraped data is invalid or empty");
    }

    console.log("Inserting new SARB GDP data...");
    await sarbGdpSchema.insertMany(scrapedData);

    console.log("SARB GDP collection updated successfully");
  });
}

async function clearAndUpdateSarbOther() {
  await retryOperation(async () => {
    console.log("Clearing SARB Other collection...");
    await sarbOtherIndicatorsSchema.deleteMany({});

    console.log("Scraping new SARB Other data...");
    const scrapedData = await sarbOtherIndicatorsScraper(
      process.env.SARB_OTHER
    );
    if (!Array.isArray(scrapedData) || scrapedData.length === 0) {
      throw new Error("Scraped data is invalid or empty");
    }

    console.log("Inserting new SARB Other data...");
    await sarbOtherIndicatorsSchema.insertMany(scrapedData);

    console.log("SARB Other collection updated successfully");
  });
}

async function clearAndUpdateSarbRepo() {
  await retryOperation(async () => {
    console.log("Clearing SARB Repo collection...");
    await sarbRepoSchema.deleteMany({});

    console.log("Scraping new SARB Repo data...");
    const scrapedData = await sarbRepoScraper(process.env.SARB_REPO_URL);
    if (!Array.isArray(scrapedData) || scrapedData.length === 0) {
      throw new Error("Scraped data is invalid or empty");
    }

    console.log("Inserting new SARB Repo data...");
    await sarbRepoSchema.insertMany(scrapedData);

    console.log("SARB Repo collection updated successfully");
  });
}

async function updateDatabase() {
  try {
    console.log("Starting database update process...");
    await connectToDatabase();

    const updatePromises = [
      clearAndUpdateJSE(),
      clearAndUpdateSarbAll(),
      clearAndUpdateSarbGdp(),
      clearAndUpdateSarbOther(),
      clearAndUpdateSarbRepo(),
    ];

    const results = await Promise.allSettled(updatePromises);

    results.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(`Task ${index + 1} failed:`, result.reason);
      } else {
        console.log(`Task ${index + 1} completed successfully`);
      }
    });
  } catch (error) {
    console.error("Error in updateDatabase:", error);
  } finally {
    await disconnectFromDatabase();
    console.log("Database update process complete. Check logs for details.");
  }
}

updateDatabase();
