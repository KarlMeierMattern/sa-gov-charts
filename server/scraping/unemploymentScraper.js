// https://www.resbank.co.za/en/home/what-we-do/statistics/releases/economic-and-financial-data-for-south-africa

import { initPuppeteer } from "../utils/puppeteer-config.js";

const unemploymentScraper = async (url) => {
  try {
    const { browser, page } = await initPuppeteer(url);

    // Add a small delay to allow dynamic content to load
    await new Promise((resolve) => setTimeout(resolve, 5000));

    await page.waitForSelector("div.section-title.px-3");

    const found = await page.evaluate(() => {
      const sectionTitles = document.querySelectorAll("div.section-title.px-3");
      for (const title of sectionTitles) {
        if (title.textContent.trim() === "Labor market indicators") {
          let section = title.parentElement;
          const rows = section.querySelectorAll(".section-row");
          for (const row of rows) {
            if (row.textContent.includes("Unemployment rate (nsa)")) {
              const spans = row.querySelectorAll("span.col-1.text-right");
              const dateSpan = row.querySelector("span.col-1.date_padding");
              return {
                unemploymentRate:
                  spans.length > 0 ? spans[0].textContent.trim() : null,
                date: dateSpan ? dateSpan.textContent.trim() : null,
              };
            }
          }
        }
      }
      return null;
    });

    if (!found) {
      throw new Error("Could not find 'Labor market indicators' section");
    }

    await browser.close();
    return found;
  } catch (error) {
    console.error("Error in unemploymentScraper:", error);
    throw error;
  }
};

export default unemploymentScraper;
