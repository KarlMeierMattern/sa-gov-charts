import puppeteer from "puppeteer";

// This function will extract and parse data from a given selector
const sarbGdpScraper = async (url, selector) => {
  try {
    // Launch Puppeteer browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the page
    await page.goto(url, { waitUntil: "load", timeout: 120000 });

    // Wait for the element with the selector to appear
    await page.waitForSelector(selector);

    // Extract the text content from the element
    const textContent = await page.$eval(selector, (element) =>
      element.textContent.trim()
    );

    // Parsing logic for extracting specific data
    const industryRegex = /^(.*?)(?=\sUnit description)/;
    const industry = textContent.match(industryRegex)?.[1]?.trim() || "N/A";

    const unitDescriptionRegex =
      /Unit description\s*:\s*(.*?)(?=\sDate of latest)/;
    const unitDescription =
      textContent.match(unitDescriptionRegex)?.[1]?.trim() || "N/A";

    const dateRegex =
      /Date of latest\s*[:\-\s]*([A-Za-z0-9\/]+)(?=\s*Latest Data)/;
    const dateOfLatest = textContent.match(dateRegex)?.[1]?.trim() || "N/A";

    const latestDataRegex = /Latest Data\s*:\s*(\d+)/;
    const latestData = textContent.match(latestDataRegex)?.[1]?.trim() || "N/A";

    const previousPeriodRegex = /Previous period\s*:\s*(\d+)/;
    const previousPeriod =
      textContent.match(previousPeriodRegex)?.[1]?.trim() || "N/A";

    const percentageChangeRegex =
      /% change over same period of previous year\s*:\s*([\d\.]+)/;
    const percentageChange =
      textContent.match(percentageChangeRegex)?.[1]?.trim() || "N/A";

    // Return the structured data
    return {
      industry,
      unitDescription,
      dateOfLatest,
      latestData,
      previousPeriod,
      percentageChange,
    };
  } catch (error) {
    console.error("Error scraping data from the element:", error);
    throw new Error("Failed to scrape data");
  }
};

export default sarbGdpScraper;
