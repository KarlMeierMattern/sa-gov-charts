// Handles initial db seeding
// To run: cd server -> npm run db:seed

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// scrapers
import jseIndexScraper from "../scraping/jseIndexScraper.js";
import sarbAllScraper from "../scraping/sarbAllScraper.js";
import sarbOtherIndicatorsScraper from "../scraping/sarbOtherIndicatorsScraper.js";
import sarbRepoScraper from "../scraping/sarbRepoScraper.js";

// models
import {
  JseModel,
  SarbAllModel,
  SarbOtherModel,
  SarbRepoModel,
} from "../model/index.js";

// Enhanced logging function
function logUpdate(message, isError = false) {
  const timestamp = new Date().toISOString();
  const formattedMessage = `[${timestamp}] ${message}`;
  if (isError) {
    console.error("\x1b[31m%s\x1b[0m", formattedMessage); // Red color for errors
  } else {
    console.log("\x1b[36m%s\x1b[0m", formattedMessage); // Cyan color for normal logs
  }
}

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logUpdate("Connected to MongoDB ✓");
  } catch (error) {
    logUpdate(`Failed to connect to MongoDB: ${error}`, true);
    process.exit(1);
  }
}

async function main() {
  await connectDB();

  try {
    // Clear existing data
    logUpdate("Clearing existing databases...");
    await JseModel.deleteMany({});
    await SarbAllModel.deleteMany({});
    await SarbOtherModel.deleteMany({});
    await SarbRepoModel.deleteMany({});
    logUpdate("Cleared existing databases ✓");

    // Initiate scraping
    logUpdate("Starting full data scrape...");

    // Insert JSE data
    const dataJSE = await jseIndexScraper(process.env.JSE_URL);
    const resultJSE = await JseModel.insertMany(dataJSE);
    logUpdate(`Successfully seeded JSE data: ${resultJSE.length} entries ✓`);

    // Insert All data
    const dataAll = await sarbAllScraper(process.env.SARB_ALL_URL);
    const resultAll = await SarbAllModel.insertMany(dataAll);
    logUpdate(`Successfully seeded All data: ${resultAll.length} entries ✓`);

    // Insert Other data
    const dataOther = await sarbOtherIndicatorsScraper(
      process.env.SARB_OTHER_URL
    );
    const resultOther = await SarbOtherModel.insertMany(dataOther);
    logUpdate(
      `Successfully seeded Other data: ${resultOther.length} entries ✓`
    );

    // Insert Repo data
    const dataRepo = await sarbRepoScraper(process.env.SARB_REPO_URL);
    const resultRepo = await SarbRepoModel.insertMany(dataRepo);
    logUpdate(`Successfully seeded Repo data: ${resultRepo.length} entries ✓`);
  } catch (error) {
    logUpdate(`Error seeding database: ${error}`, true);
    process.exit(1);
  } finally {
    // Close the MongoDB connection
    await mongoose.connection.close();
    logUpdate("Database connection closed ✓");
  }
}

// Run the seed function
main().catch((e) => {
  logUpdate(e.message, true);
  process.exit(1);
});
