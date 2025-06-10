import logUpdate from "colourful-logger";

const url =
  "https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics/current-market-rates";

const getWebsiteData = async (req, res) => {
  try {
    logUpdate("Starting scrape of website");
    const response = await fetch(url);
    const html = await response.text();
    logUpdate(`Successfully scraped ${url}`);
    res.send(html);
  } catch (error) {
    console.error("❌ Error scraping website", error);
    throw new Error("Something went wrong");
  }
};

export { getWebsiteData };
