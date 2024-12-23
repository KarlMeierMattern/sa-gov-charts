import puppeteer from "puppeteer";

const statssaController = async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: "new", // Puppeteer v20+ recommended option
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Navigate to StatsSA
    await page.goto("https://www.statssa.gov.za/", {
      waitUntil: "domcontentloaded",
      timeout: 60000, // Increase timeout for slow loading
    });

    // Wait for dropdown selector to appear
    await page.waitForSelector("#homepage_map_year_selector");

    // Get all available years
    const years = await page.evaluate(() => {
      const yearElements = document.querySelectorAll(
        "#homepage_map_year_selector option"
      );
      return Array.from(yearElements).map((el) => el.textContent.trim());
    });

    const data = [];

    for (const year of years) {
      // Select each year
      await page.select("#homepage_map_year_selector", year);

      // Wait for population data to load
      await page.waitForTimeout(500);

      // Extract population
      const population = await page.evaluate(() => {
        const counter = document.querySelector("#homepage_map_counter");
        return counter ? counter.textContent.trim() : null;
      });

      data.push({ year, population });
    }

    await browser.close();

    // Send JSON response
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in /stats-sa:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

export { statssaController };
