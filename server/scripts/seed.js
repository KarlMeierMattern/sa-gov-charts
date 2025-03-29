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

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

async function main() {
  await connectDB();

  try {
    // Clear existing data
    console.log("Clearing existing databases...");
    await JseModel.deleteMany({});
    await SarbAllModel.deleteMany({});
    await SarbOtherModel.deleteMany({});
    await SarbRepoModel.deleteMany({});
    console.log("Cleared existing databases...");

    // Initiate scraping
    console.log("Starting full data scrape...");

    // Insert JSE data
    const dataJSE = await jseIndexScraper(process.env.JSE_URL);
    const resultJSE = await JseModel.insertMany(dataJSE);
    console.log(`Successfully seeded JSE data: ${resultJSE.length} entries`);

    // Insert All data
    const dataAll = await sarbAllScraper(process.env.SARB_ALL_URL);
    const resultAll = await SarbAllModel.insertMany(dataAll);
    console.log(`Successfully seeded All data: ${resultAll.length} entries`);

    // Insert Other data
    const dataOther = await sarbOtherIndicatorsScraper(
      process.env.SARB_OTHER_URL
    );
    const resultOther = await SarbOtherModel.insertMany(dataOther);
    console.log(
      `Successfully seeded Other data: ${resultOther.length} entries`
    );

    // Insert Repo data
    const dataRepo = await sarbRepoScraper(process.env.SARB_REPO_URL);
    const resultRepo = await SarbRepoModel.insertMany(dataRepo);
    console.log(`Successfully seeded Repo data: ${resultRepo.length} entries`);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    // Close the MongoDB connection
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
}

// Run the seed function
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
