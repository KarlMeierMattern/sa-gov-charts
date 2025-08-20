// https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics/current-market-rates

import puppeteer from "puppeteer";

const sarbTimelineScraper = async ({ url, text }) => {
  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();

    // Navigate to the URL
    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    // Add a small delay to allow dynamic content to load
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Wait for the table to load
    await page.waitForSelector(".table tbody tr td.mcode a", {
      timeout: 60000,
    });

    // Find the "Repo rate" link and click it
    const links = await page.$$(".table tbody tr td.mcode a");
    for (const link of links) {
      const linkText = await page.evaluate((el) => el.textContent.trim(), link);
      if (linkText === text) {
        console.log(`Found link with text: ${linkText}`);
        await link.click();
        console.log("Clicked link");
        break;
      }
    }

    // Wait for the new table to appear
    await page.waitForSelector(".table.repotable tbody tr td", {
      timeout: 30000,
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // const tableHtml = await page.evaluate(() => {
    //   const table = document.querySelector(".table.repotable");
    //   return table ? table.outerHTML : "Table not found";
    // });
    // console.log(tableHtml);

    // Now scrape the data
    const data = await page.evaluate(() => {
      const results = [];
      console.log("Scraping data");
      const rows = document.querySelectorAll(".table.repotable tbody tr");
      for (const row of rows) {
        const dateCell = row.querySelector("td.date");
        const valCell = row.querySelector("td.val");
        if (
          dateCell &&
          valCell &&
          dateCell.textContent.trim() &&
          valCell.textContent.trim()
        ) {
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

export default sarbTimelineScraper;
