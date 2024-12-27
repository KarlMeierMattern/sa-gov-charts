import { chromium } from "playwright";

const sarbRealGdpScraper = async (url) => {
  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    console.log(`Starting to scrape the URL: ${url}`);
    await page.goto(url, { waitUntil: "load" });
    console.log("Page loaded successfully.");

    // Find and click the link with value="KBP6006S"
    const link = await page.locator('a[value="KBP6006S"]');
    if (!(await link.count())) {
      console.error("Link not found");
      await browser.close();
      return;
    }

    console.log("Link found. Clicking the link...");
    await Promise.all([
      link.click(),
      page.waitForLoadState("load"), // Wait until the new page fully loads
    ]);
    console.log("Navigation complete.");

    // Wait for the target table to load
    const tableSelector = "table"; // Update this if needed
    await page.waitForSelector(tableSelector, { timeout: 60000 });
    console.log("Target table loaded. Ready to scrape.");

    // Extract table data
    const data = await page.$eval(tableSelector, (tableElement) => {
      const rows = tableElement.querySelectorAll("tr");
      const results = [];
      rows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        if (cells.length >= 2) {
          const date = cells[0]?.textContent.trim() || "N/A";
          const value = parseFloat(cells[1]?.textContent.trim()) || "N/A";
          if (date !== "N/A" && value !== "N/A") {
            results.push({
              Date: date,
              Value: value,
            });
          }
        }
      });
      return results;
    });

    console.log("Scraping complete. Closing the browser...");
    await browser.close();
    return data;
  } catch (error) {
    console.error("Error during scraping:", error.message);
    throw new Error("Failed to scrape real GDP data");
  }
};

export default sarbRealGdpScraper;
