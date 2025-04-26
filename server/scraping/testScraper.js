// https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics/current-market-rates

import puppeteer from "puppeteer";

const sarbRepoScraper = async (url) => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });

    const page = await browser.newPage();

    // Navigate to the URL
    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    // Add a small delay to allow dynamic content to load
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Wait for the table to load
    await page.waitForSelector(".table tr .mcode a", { timeout: 60000 });

    // Find the "Repo rate" link and click it
    const links = await page.$$(".table tr .mcode a");
    for (const link of links) {
      const text = await page.evaluate((el) => el.textContent.trim(), link);
      if (text === "Repo rate") {
        await link.click();
        break;
      }
    }

    // Wait for the new table to appear (not navigation)
    await page.waitForSelector(".table.repotable td.date", { timeout: 30000 });

    // Now scrape the data
    const data = await page.evaluate(() => {
      const results = [];
      const rows = document.querySelectorAll(".table.repotable tbody tr");
      for (const row of rows) {
        const dateCell = row.querySelector("td.date");
        const valCell = row.querySelector("td.val");
        if (dateCell && valCell) {
          results.push({
            date: dateCell.textContent.trim(),
            value: valCell.textContent.trim(),
          });
        }
      }
      return results;
    });

    await browser.close();

    return data;
  } catch (error) {
    console.error("Error extracting market rates:", error.message);
    throw new Error("Failed to scrape market rates");
  }
};

export default sarbRepoScraper;
