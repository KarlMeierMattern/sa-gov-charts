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
import unemploymentScraper from "../scraping/unemploymentScraper.js";
import unemploymentTimelineScraper from "../scraping/unemploymentTimelineScraper.js";
// models
import {
  JseModel,
  SarbAllModel,
  SarbOtherModel,
  SarbRepoModel,
  SarbRepoTimelineModel,
  SarbFxTimelineModel,
  SarbRealGdpTimelineModel,
  SarbPrimeTimelineModel,
  SarbChangePrimeTimelineModel,
  SarbChangeRepoTimelineModel,
  SarbGoldTimelineModel,
  SarbGbpTimelineModel,
  SarbEuroTimelineModel,
  SarbUnemploymentModel,
  SarbUnemploymentTimelineModel,
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

    // Insert Unemployment data
    console.time("Unemployment data scrape time");
    const dataUnemployment = await unemploymentScraper(
      process.env.SARB_UNEMPLOYMENT
    );

    await SarbUnemploymentModel.updateOne(
      { unemploymentRate: dataUnemployment.unemploymentRate },
      { $set: dataUnemployment },
      { upsert: true }
    );
    console.timeEnd("Unemployment data scrape time");
    logUpdate(
      `Successfully updated Unemployment data: ${dataUnemployment.length} entries ✓`
    );

    // Insert Unemployment Timeline data
    console.time("Unemployment Timeline data scrape time");
    const dataUnemploymentTimeline = await unemploymentTimelineScraper(
      process.env.SARB_UNEMPLOYMENT
    );

    for (const data of dataUnemploymentTimeline) {
      await SarbUnemploymentTimelineModel.updateOne(
        { date: data.date },
        { $set: data },
        { upsert: true }
      );
    }
    console.timeEnd("Unemployment Timeline data scrape time");
    logUpdate(
      `Successfully updated Unemployment Timeline data: ${dataUnemploymentTimeline.length} entries ✓`
    );

    // Insert FX Timeline data
    console.time("FX Timeline data scrape time");

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
    console.timeEnd("FX Timeline data scrape time");
    logUpdate(
      `Successfully updated FX Timeline data: ${dataFxTimeline.length} entries ✓`
    );

    // Insert GBP Timeline data
    console.time("GBP Timeline data scrape time");

    const dataGbpTimeline = await sarbTimelineScraper({
      url: process.env.SARB_REPO_URL,
      text: "Rand per British Pound",
    });

    for (const data of dataGbpTimeline) {
      await SarbGbpTimelineModel.updateOne(
        { date: data.date },
        { $set: data },
        { upsert: true }
      );
    }
    console.timeEnd("GBP Timeline data scrape time");
    logUpdate(
      `Successfully updated GBP Timeline data: ${dataGbpTimeline.length} entries ✓`
    );

    // Insert Euro Timeline data
    console.time("Euro Timeline data scrape time");

    const dataEuroTimeline = await sarbTimelineScraper({
      url: process.env.SARB_REPO_URL,
      text: "Rand per Euro",
    });

    for (const data of dataEuroTimeline) {
      await SarbEuroTimelineModel.updateOne(
        { date: data.date },
        { $set: data },
        { upsert: true }
      );
    }
    console.timeEnd("Euro Timeline data scrape time");
    logUpdate(
      `Successfully updated Euro Timeline data: ${dataEuroTimeline.length} entries ✓`
    );

    // Insert Gold Timeline data
    console.time("Gold Timeline data scrape time");

    const dataGoldTimeline = await sarbTimelineScraper({
      url: process.env.SARB_REPO_URL,
      text: "US Dollar",
    });

    for (const data of dataGoldTimeline) {
      await SarbGoldTimelineModel.updateOne(
        { date: data.date },
        { $set: data },
        { upsert: true }
      );
    }
    console.timeEnd("Gold Timeline data scrape time");
    logUpdate(
      `Successfully updated Gold Timeline data: ${dataGoldTimeline.length} entries ✓`
    );

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
    console.time("All data scrape time");
    const dataAll = await sarbAllScraper(process.env.SARB_ALL_URL);

    for (const data of dataAll) {
      await SarbAllModel.updateOne(
        { sector: data.sector },
        { $set: data },
        { upsert: true }
      );
    }
    console.timeEnd("All data scrape time");
    // const resultAll = await SarbAllModel.insertMany(dataAll);
    logUpdate(`Successfully updated All data: ${dataAll.length} entries ✓`);

    // Insert Other data
    console.time("Other data scrape time");
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
    console.timeEnd("Other data scrape time");
    logUpdate(`Successfully updated Other data: ${dataOther.length} entries ✓`);

    // Insert Repo data
    console.time("Repo data scrape time");
    const dataRepo = await sarbRepoScraper(process.env.SARB_REPO_URL);

    for (const data of dataRepo) {
      await SarbRepoModel.updateOne(
        { name: data.name },
        { $set: data },
        { upsert: true }
      );
    }
    console.timeEnd("Repo data scrape time");
    // const resultRepo = await SarbRepoModel.insertMany(dataRepo);
    logUpdate(`Successfully updated Repo data: ${dataRepo.length} entries ✓`);

    // Insert Repo Timeline data
    console.time("Repo Timeline data scrape time");

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
    console.timeEnd("Repo Timeline data scrape time");
    logUpdate(
      `Successfully updated Repo Timeline data: ${dataRepoTimeline.length} entries ✓`
    );

    // Insert Real GDP Timeline data
    console.time("Real GDP Timeline data scrape time");

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
    console.timeEnd("Real GDP Timeline data scrape time");
    logUpdate(
      `Successfully updated Real GDP Timeline data: ${dataRealGdpTimeline.length} entries ✓`
    );

    // Insert Prime Timeline data
    console.time("Prime Timeline data scrape time");

    const dataPrimeTimeline = await sarbTimelineScraper({
      url: process.env.SARB_REPO_URL,
      text: "Prime lending rate",
    });

    for (const data of dataPrimeTimeline) {
      await SarbPrimeTimelineModel.updateOne(
        { date: data.date },
        { $set: data },
        { upsert: true }
      );
    }
    console.timeEnd("Prime Timeline data scrape time");
    logUpdate(
      `Successfully updated Prime Timeline data: ${dataPrimeTimeline.length} entries ✓`
    );

    // Insert Change Prime Timeline data
    console.time("Change Prime Timeline data scrape time");

    const dataChangePrimeTimeline = await sarbTimelineScraper({
      url: process.env.SARB_OTHER_URL,
      text: "Dates of change in the prime lending rate",
    });

    for (const data of dataChangePrimeTimeline) {
      await SarbChangePrimeTimelineModel.updateOne(
        { date: data.date },
        { $set: data },
        { upsert: true }
      );
    }
    console.timeEnd("Change Prime Timeline data scrape time");
    logUpdate(
      `Successfully updated Change Prime Timeline data: ${dataChangePrimeTimeline.length} entries ✓`
    );

    // Insert Change Repo Timeline data
    console.time("Change Repo Timeline data scrape time");

    const dataChangeRepoTimeline = await sarbTimelineScraper({
      url: process.env.SARB_OTHER_URL,
      text: "Dates of change in the repurchase rate",
    });

    for (const data of dataChangeRepoTimeline) {
      await SarbChangeRepoTimelineModel.updateOne(
        { date: data.date },
        { $set: data },
        { upsert: true }
      );
    }
    console.timeEnd("Change Repo Timeline data scrape time");
    logUpdate(
      `Successfully updated Change Repo Timeline data: ${dataChangeRepoTimeline.length} entries ✓`
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
