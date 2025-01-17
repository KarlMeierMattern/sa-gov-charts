// https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics

import puppeteer from "puppeteer";

const sarbOtherIndicatorsScraper = async (url) => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

    // Wait for table element with longer timeout
    await page.waitForSelector("table", { timeout: 60000 });

    await page.goto(url, { waitUntil: "networkidle0" });

    const data = await page.evaluate(() => {
      const results = [];
      const cpiText = document
        .querySelector(".header__statitem")
        ?.textContent.trim()
        .match(/\d+(\.\d+)?%/)?.[0];

      const cpi = cpiText ? parseFloat(cpiText.replace("%", "")) : null;

      results.push({
        Name: "CPI",
        Value: cpi,
        Date: "na",
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
              Name: name,
              Value: parseFloat(val),
              Date: date,
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