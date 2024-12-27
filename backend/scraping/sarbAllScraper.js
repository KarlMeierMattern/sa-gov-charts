import puppeteer from "puppeteer";

const sarbAllScraper = async (url) => {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      ignoreHTTPSErrors: true,
      args: ["--ignore-certificate-errors", "--no-sandbox"],
    });
    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    await page.waitForSelector(".table");

    const data = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll(".table tbody tr"));

      return rows
        .map((row) => {
          const cells = Array.from(row.querySelectorAll("td"));
          if (cells.length === 0) return null;

          return {
            sector: cells[0]?.textContent.trim() || "",
            unit: cells[1]?.textContent.trim() || "",
            period: cells[2]?.textContent.trim() || "",
            currentValue:
              parseFloat(cells[3]?.textContent.trim().replace(/,/g, "")) || 0,
            previousValue:
              parseFloat(cells[4]?.textContent.trim().replace(/,/g, "")) || 0,
            percentageChange: parseFloat(cells[5]?.textContent.trim()) || 0,
            source: cells[6]?.textContent.trim() || "",
          };
        })
        .filter((item) => item !== null);
    });

    await browser.close();
    return data;
  } catch (error) {
    console.error("Error scraping SARB data:", error.message);
    throw new Error("Failed to scrape SARB data");
  }
};

export default sarbAllScraper;
