import puppeteer from "puppeteer";

const unemploymentTimelineScraper = async (url) => {
  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
    });

    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });

    // Add a small delay to allow dynamic content to load
    await new Promise((resolve) => setTimeout(resolve, 5000));

    await page.waitForSelector("div.section-title.px-3");

    // Find and click the "Unemployment rate (nsa)" link
    const clicked = await page.evaluate(() => {
      const sectionTitles = document.querySelectorAll("div.section-title.px-3");
      for (const title of sectionTitles) {
        if (title.textContent.trim() === "Labor market indicators") {
          let section = title.parentElement;
          const rows = section.querySelectorAll(".section-row");
          for (const row of rows) {
            if (row.textContent.includes("Unemployment rate (nsa)")) {
              // Find the anchor link and click it
              const link = row.querySelector("a.anchor-link");
              if (link) {
                link.click();
                console.log("Clicked link");
                return true;
              }
            }
          }
        }
      }
      return false;
    });

    if (!clicked) {
      throw new Error("Could not find or click 'Unemployment rate (nsa)' link");
    }

    // Wait for the table to appear
    await page.waitForSelector(".table.repotable tbody tr td", {
      timeout: 30000,
    });

    // Optionally wait for data to load
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Scrape the data
    const data = await page.evaluate(() => {
      const results = [];
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
    console.error("Error in unemploymentTimelineScraper:", error);
    throw error;
  }
};

export default unemploymentTimelineScraper;
