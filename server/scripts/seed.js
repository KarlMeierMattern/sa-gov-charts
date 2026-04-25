// Handles initial db seeding
// To run: cd server -> npm run db:seed

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// scrapers
import {
  jseIndexScraper,
  sarbAllScraper,
  sarbOtherIndicatorsScraper,
  sarbRepoScraper,
  sarbTimelineScraper,
  unemploymentScraper,
  unemploymentTimelineScraper,
} from "../scraping/index.js";

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

export default async function seedDatabase() {
  const SARB_REPO_URL =
    "https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics/current-market-rates";

  const SARB_ALL_URL =
    "https://resbank.co.za/en/home/what-we-do/statistics/releases/national-summary-data-page";

  const SARB_OTHER_URL =
    "https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics";

  const JSE_URL = "https://www.jse.co.za/";

  const SARB_UNEMPLOYMENT =
    "https://www.resbank.co.za/en/home/what-we-do/statistics/releases/economic-and-financial-data-for-south-africa";

  await connectDB();

  const failures = [];

  async function run(label, fn) {
    try {
      await fn();
    } catch (error) {
      logUpdate(`[SKIPPED] ${label}: ${error.message}`, true);
      failures.push(label);
    }
  }

  logUpdate("Starting full data scrape...");

  await run("Unemployment data", async () => {
    console.time("Unemployment data scrape time");
    const data = await unemploymentScraper(SARB_UNEMPLOYMENT);
    await SarbUnemploymentModel.updateOne(
      { unemploymentRate: data.unemploymentRate },
      { $set: data },
      { upsert: true },
    );
    console.timeEnd("Unemployment data scrape time");
    logUpdate(`Successfully updated Unemployment data ✓`);
  });

  await run("Unemployment Timeline data", async () => {
    console.time("Unemployment Timeline data scrape time");
    const data = await unemploymentTimelineScraper(SARB_UNEMPLOYMENT);
    for (const d of data) {
      await SarbUnemploymentTimelineModel.updateOne(
        { date: d.date },
        { $set: d },
        { upsert: true },
      );
    }
    console.timeEnd("Unemployment Timeline data scrape time");
    logUpdate(
      `Successfully updated Unemployment Timeline data: ${data.length} entries ✓`,
    );
  });

  await run("FX Timeline data", async () => {
    console.time("FX Timeline data scrape time");
    const data = await sarbTimelineScraper({
      url: SARB_REPO_URL,
      text: "Rand per US Dollar",
    });
    for (const d of data) {
      await SarbFxTimelineModel.updateOne(
        { date: d.date },
        { $set: d },
        { upsert: true },
      );
    }
    console.timeEnd("FX Timeline data scrape time");
    logUpdate(
      `Successfully updated FX Timeline data: ${data.length} entries ✓`,
    );
  });

  await run("GBP Timeline data", async () => {
    console.time("GBP Timeline data scrape time");
    const data = await sarbTimelineScraper({
      url: SARB_REPO_URL,
      text: "Rand per British Pound",
    });
    for (const d of data) {
      await SarbGbpTimelineModel.updateOne(
        { date: d.date },
        { $set: d },
        { upsert: true },
      );
    }
    console.timeEnd("GBP Timeline data scrape time");
    logUpdate(
      `Successfully updated GBP Timeline data: ${data.length} entries ✓`,
    );
  });

  await run("Euro Timeline data", async () => {
    console.time("Euro Timeline data scrape time");
    const data = await sarbTimelineScraper({
      url: SARB_REPO_URL,
      text: "Rand per Euro",
    });
    for (const d of data) {
      await SarbEuroTimelineModel.updateOne(
        { date: d.date },
        { $set: d },
        { upsert: true },
      );
    }
    console.timeEnd("Euro Timeline data scrape time");
    logUpdate(
      `Successfully updated Euro Timeline data: ${data.length} entries ✓`,
    );
  });

  await run("Gold Timeline data", async () => {
    console.time("Gold Timeline data scrape time");
    const data = await sarbTimelineScraper({
      url: SARB_REPO_URL,
      text: "US Dollar",
    });
    for (const d of data) {
      await SarbGoldTimelineModel.updateOne(
        { date: d.date },
        { $set: d },
        { upsert: true },
      );
    }
    console.timeEnd("Gold Timeline data scrape time");
    logUpdate(
      `Successfully updated Gold Timeline data: ${data.length} entries ✓`,
    );
  });

  await run("JSE data", async () => {
    console.time("JSE scrape time");
    const data = await jseIndexScraper(JSE_URL);
    for (const d of data) {
      await JseModel.updateOne(
        { index: d.index },
        { $set: d },
        { upsert: true },
      );
    }
    console.timeEnd("JSE scrape time");
    logUpdate(`Successfully updated JSE data: ${data.length} entries ✓`);
  });

  await run("All data", async () => {
    console.time("All data scrape time");
    const data = await sarbAllScraper(SARB_ALL_URL);
    for (const d of data) {
      await SarbAllModel.updateOne(
        { sector: d.sector },
        { $set: d },
        { upsert: true },
      );
    }
    console.timeEnd("All data scrape time");
    logUpdate(`Successfully updated All data: ${data.length} entries ✓`);
  });

  await run("Other data", async () => {
    console.time("Other data scrape time");
    const data = await sarbOtherIndicatorsScraper(SARB_OTHER_URL);
    for (const d of data) {
      await SarbOtherModel.updateOne(
        { name: d.name },
        { $set: d },
        { upsert: true },
      );
    }
    console.timeEnd("Other data scrape time");
    logUpdate(`Successfully updated Other data: ${data.length} entries ✓`);
  });

  await run("Repo data", async () => {
    console.time("Repo data scrape time");
    const data = await sarbRepoScraper(SARB_REPO_URL);
    for (const d of data) {
      await SarbRepoModel.updateOne(
        { name: d.name },
        { $set: d },
        { upsert: true },
      );
    }
    console.timeEnd("Repo data scrape time");
    logUpdate(`Successfully updated Repo data: ${data.length} entries ✓`);
  });

  await run("Repo Timeline data", async () => {
    console.time("Repo Timeline data scrape time");
    const data = await sarbTimelineScraper({
      url: SARB_REPO_URL,
      text: "Repo rate",
    });
    for (const d of data) {
      await SarbRepoTimelineModel.updateOne(
        { date: d.date },
        { $set: d },
        { upsert: true },
      );
    }
    console.timeEnd("Repo Timeline data scrape time");
    logUpdate(
      `Successfully updated Repo Timeline data: ${data.length} entries ✓`,
    );
  });

  await run("Real GDP Timeline data", async () => {
    console.time("Real GDP Timeline data scrape time");
    const data = await sarbTimelineScraper({
      url: SARB_OTHER_URL,
      text: "Real GDP growth rate",
    });
    for (const d of data) {
      await SarbRealGdpTimelineModel.updateOne(
        { date: d.date },
        { $set: d },
        { upsert: true },
      );
    }
    console.timeEnd("Real GDP Timeline data scrape time");
    logUpdate(
      `Successfully updated Real GDP Timeline data: ${data.length} entries ✓`,
    );
  });

  await run("Prime Timeline data", async () => {
    console.time("Prime Timeline data scrape time");
    const data = await sarbTimelineScraper({
      url: SARB_REPO_URL,
      text: "Prime lending rate",
    });
    for (const d of data) {
      await SarbPrimeTimelineModel.updateOne(
        { date: d.date },
        { $set: d },
        { upsert: true },
      );
    }
    console.timeEnd("Prime Timeline data scrape time");
    logUpdate(
      `Successfully updated Prime Timeline data: ${data.length} entries ✓`,
    );
  });

  await run("Change Prime Timeline data", async () => {
    console.time("Change Prime Timeline data scrape time");
    const data = await sarbTimelineScraper({
      url: SARB_OTHER_URL,
      text: "Dates of change in the prime lending rate",
    });
    for (const d of data) {
      await SarbChangePrimeTimelineModel.updateOne(
        { date: d.date },
        { $set: d },
        { upsert: true },
      );
    }
    console.timeEnd("Change Prime Timeline data scrape time");
    logUpdate(
      `Successfully updated Change Prime Timeline data: ${data.length} entries ✓`,
    );
  });

  await run("Change Repo Timeline data", async () => {
    console.time("Change Repo Timeline data scrape time");
    const data = await sarbTimelineScraper({
      url: SARB_OTHER_URL,
      text: "Dates of change in the repurchase rate",
    });
    for (const d of data) {
      await SarbChangeRepoTimelineModel.updateOne(
        { date: d.date },
        { $set: d },
        { upsert: true },
      );
    }
    console.timeEnd("Change Repo Timeline data scrape time");
    logUpdate(
      `Successfully updated Change Repo Timeline data: ${data.length} entries ✓`,
    );
  });

  await mongoose.connection.close();
  logUpdate("Database connection closed ✓");

  if (failures.length > 0) {
    logUpdate(
      `Seed completed with ${failures.length} failure(s): ${failures.join(", ")}`,
      true,
    );
    process.exit(1);
  } else {
    logUpdate("Seed completed successfully ✓");
  }
}

// Run the seed function
seedDatabase().catch((e) => {
  logUpdate(e.message, true);
  process.exit(1);
});
