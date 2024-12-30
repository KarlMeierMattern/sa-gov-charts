// https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics

import puppeteer from "puppeteer";

const sarbOtherIndicatorsScraper = async (url) => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

    // Wait for table element with longer timeout
    await page.waitForSelector("table", { timeout: 60000 });

    const data = await page.evaluate(() => {
      const rows = document.querySelectorAll("table tr");

      const results = [];
      rows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        if (cells.length >= 2) {
          const date = cells[0]?.textContent.trim() || "N/A";
          const val = cells[1]?.textContent.trim() || "N/A";

          if (date !== "N/A" && val !== "N/A") {
            results.push({
              Date: date,
              Value: parseFloat(val),
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
