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
import sarbTimelineScraper from "../scraping/sarbTimelineScraper.js";
// models
import {
  JseModel,
  SarbAllModel,
  SarbOtherModel,
  SarbRepoModel,
  SarbRepoTimelineModel,
  SarbFxTimelineModel,
  SarbRealGdpTimelineModel,
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
    // Initiate scraping
    logUpdate("Starting full data scrape...");

    // Insert JSE data
    console.time("JSE scrape time");
    const dataJSE = await jseIndexScraper(process.env.JSE_URL);

    for (const data of dataJSE) {
      await JseModel.updateOne(
        { index: data.index }, // unique identifier
        { $set: data },
        { upsert: true }
      );
    }
    console.timeEnd("JSE scrape time");

    // const resultJSE = await JseModel.insertMany(dataJSE);
    logUpdate(`Successfully updated JSE data: ${dataJSE.length} entries ✓`);

    // Insert All data
    const dataAll = await sarbAllScraper(process.env.SARB_ALL_URL);

    for (const data of dataAll) {
      await SarbAllModel.updateOne(
        { sector: data.sector },
        { $set: data },
        { upsert: true }
      );
    }
    // const resultAll = await SarbAllModel.insertMany(dataAll);
    logUpdate(`Successfully updated All data: ${dataAll.length} entries ✓`);

    // Insert Other data
    const dataOther = await sarbOtherIndicatorsScraper(
      process.env.SARB_OTHER_URL
    );

    for (const data of dataOther) {
      await SarbOtherModel.updateOne(
        { name: data.name },
        { $set: data },
        { upsert: true }
      );
    }

    logUpdate(`Successfully updated Other data: ${dataOther.length} entries ✓`);

    // Insert Repo data
    const dataRepo = await sarbRepoScraper(process.env.SARB_REPO_URL);

    for (const data of dataRepo) {
      await SarbRepoModel.updateOne(
        { name: data.name },
        { $set: data },
        { upsert: true }
      );
    }

    // const resultRepo = await SarbRepoModel.insertMany(dataRepo);
    logUpdate(`Successfully updated Repo data: ${dataRepo.length} entries ✓`);

    // Insert Repo Timeline data
    const dataRepoTimeline = await sarbTimelineScraper({
      url: process.env.SARB_REPO_URL,
      text: "Repo rate",
    });

    for (const data of dataRepoTimeline) {
      await SarbRepoTimelineModel.updateOne(
        { date: data.date },
        { $set: data },
        { upsert: true }
      );
    }

    logUpdate(
      `Successfully updated Repo Timeline data: ${dataRepoTimeline.length} entries ✓`
    );

    // Insert FX Timeline data
    const dataFxTimeline = await sarbTimelineScraper({
      url: process.env.SARB_REPO_URL,
      text: "Rand per US Dollar",
    });

    for (const data of dataFxTimeline) {
      await SarbFxTimelineModel.updateOne(
        { date: data.date },
        { $set: data },
        { upsert: true }
      );
    }

    logUpdate(
      `Successfully updated FX Timeline data: ${dataFxTimeline.length} entries ✓`
    );

    // Insert Real GDP Timeline data
    const dataRealGdpTimeline = await sarbTimelineScraper({
      url: process.env.SARB_OTHER_URL,
      text: "Real GDP growth rate",
    });

    for (const data of dataRealGdpTimeline) {
      await SarbRealGdpTimelineModel.updateOne(
        { date: data.date },
        { $set: data },
        { upsert: true }
      );
    }

    logUpdate(
      `Successfully updated Real GDP Timeline data: ${dataRealGdpTimeline.length} entries ✓`
    );
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
