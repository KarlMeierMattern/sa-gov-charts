// https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics

import { initPuppeteer } from "../utils/puppeteer-config.js";

const sarbOtherIndicatorsScraper = async (url) => {
  try {
    const { browser, page } = await initPuppeteer(url);

    // Add a small delay to allow dynamic content to load
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Wait for table element with longer timeout
    await page.waitForSelector("table", { timeout: 120000 });

    const data = await page.evaluate(() => {
      const results = [];
      const cpiText = document
        .querySelector(".header__statitem")
        ?.textContent.trim()
        .match(/\d+(\.\d+)?%/)?.[0];

      const cpi = cpiText ? parseFloat(cpiText.replace("%", "")) : null;

      results.push({
        name: "CPI",
        value: cpi,
        date: "na",
      });

      const rows = document.querySelectorAll("table tr");

      rows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        if (cells.length >= 2) {
          const name = cells[0]?.textContent.trim() || "N/A";
          const val = cells[1]?.textContent.trim() || "N/A";
          const date = cells[2]?.textContent.trim() || "N/A";

          if (name !== "N/A" && val !== "N/A" && date !== "N/A") {
            results.push({
              name: name,
              value: parseFloat(val),
              date: date,
            });
          }
        }
      });
      return results;
    });

    await browser.close();
    return data;
  } catch (error) {
    console.error("Error extracting real GDP data:", error.message);
    throw new Error("Failed to scrape real GDP data");
  }
};

export default sarbOtherIndicatorsScraper;
