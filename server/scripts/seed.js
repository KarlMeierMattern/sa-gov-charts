// Handles initial db seeding
// npm run db:seed

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// scrapers
import jseIndexScraper from "../scraping/jseIndexScraper.js";
import sarbAllScraper from "../scraping/sarbAllScraper.js";
import sarbOtherIndicatorsScraper from "../scraping/sarbOtherIndicatorsScraper.js";
import sarbRepoScraper from "../scraping/sarbRepoScraper.js";

// models
import { jseIndex } from "../model/jseIndexModel.js";
import { allSarbSchema } from "../model/sarbAllModel.js";
import { sarbOtherIndicatorsSchema } from "../model/sarbOtherIndicators.js";
import { sarbRepoSchema } from "../model/sarbRepoModel.js";

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
    await jseIndex.deleteMany({});
    await allSarbSchema.deleteMany({});
    await sarbOtherIndicatorsSchema.deleteMany({});
    await sarbRepoSchema.deleteMany({});
    console.log("Cleared existing databases...");

    // Initiate scraping
    console.log("Starting full data scrape...");

    // Insert JSE data
    const urlJSE = process.env.JSE_URL;
    const dataJSE = await jseIndexScraper(urlJSE);
    const resultJSE = await jseIndex.insertMany(dataJSE);
    console.log(`Successfully seeded JSE data: ${resultJSE.length} entries`);

    // Insert All data
    const urlAll = process.env.SARB_ALL_URL;
    const dataAll = await sarbAllScraper(urlAll);
    const resultAll = await allSarbSchema.insertMany(dataAll);
    console.log(`Successfully seeded All data: ${resultAll.length} entries`);

    // Insert Other data
    const urlOther = process.env.SARB_OTHER_URL;
    const dataOther = await sarbOtherIndicatorsScraper(urlOther);
    const resultOther = await sarbOtherIndicatorsSchema.insertMany(dataOther);
    console.log(
      `Successfully seeded Other data: ${resultOther.length} entries`
    );

    // Insert Repo data
    const urlRepo = process.env.SARB_REPO_URL;
    const dataRepo = await sarbRepoScraper(urlRepo);
    const resultRepo = await sarbRepoSchema.insertMany(dataRepo);
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
