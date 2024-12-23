import puppeteer from "puppeteer";

const extractMarketRates = async (url) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
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
        const date = row.querySelector("td.date")?.textContent.trim() || "N/A";
        const value = row.querySelector("td.val")?.textContent.trim() || "N/A";
        results.push({ Date: date, Value: value });
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

export default extractMarketRates;
