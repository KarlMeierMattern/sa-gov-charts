// https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics/current-market-rates

import puppeteer from "puppeteer";

const sarbRepoScraper = async (url) => {
  try {
    // const browser = await puppeteer.launch({ headless: true }); // browser operates without a GUI = faster and consumes less memory

    const browser = await puppeteer.launch({
      executablePath: "/usr/bin/google-chrome-stable",
      headless: "new", // Avoid the deprecation warning
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Navigate to the URL
    await page.goto(url);

    // Wait for the table to load
    await page.waitForSelector(".table");

    // Extract dates and values
    const data = await page.evaluate(() => {
      // Select all rows in the table
      const rows = document.querySelectorAll(".table tr");

      // Extract data from each row
      const results = [];
      rows.forEach((row) => {
        const name = row.querySelector("td.mcode")?.textContent.trim() || "N/A";
        const date =
          row.querySelector("td.mperiod")?.textContent.trim() || "N/A";
        const value = row.querySelector("td.mval")?.textContent.trim() || "N/A";
        results.push({ name: name, lastPeriod: date, value: value });
      });

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
