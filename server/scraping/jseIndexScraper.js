// https://www.jse.co.za/

import puppeteer from "puppeteer";

const jseIndexScraper = async (url) => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });

    const page = await browser.newPage();

    // Navigate to the JSE website with more reliable wait conditions
    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });

    // Add a small delay to allow dynamic content to load
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Define the range of data-slick-index values to scrape
    const indices = Array.from({ length: 8 }, (_, i) => i); // [0, 1, 2, ..., 7]

    // Wait for at least one of the elements to load
    await page.waitForSelector(
      '[data-slick-index="0"] .featured-instrument__price',
      { timeout: 120000 }
    );

    // Scrape all values
    const data = await page.evaluate((indices) => {
      const results = [];

      indices.forEach((index) => {
        // Find the element using the current index
        const element = document.querySelector(
          `[data-slick-index="${index}"] .featured-instrument__price`
        );
        const nameElement = document.querySelector(
          `[data-slick-index="${index}"] .featured-instrument__name`
        );

        // Extract the text content
        const value = element?.textContent.trim() || "N/A";
        const name = nameElement?.textContent.trim() || `Instrument ${index}`;

        results.push({
          index: index,
          name: name,
          value: value,
        });
      });

      return results;
    }, indices);

    await browser.close();
    return data;
  } catch (error) {
    console.error("Error extracting JSE data:", error.message);
    throw new Error("Failed to scrape JSE data");
  }
};

export default jseIndexScraper;
