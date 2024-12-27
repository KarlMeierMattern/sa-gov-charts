import sarbOverviewScraper from "../scraping/sarbOverviewScraper.js";

const postSarbOverview = async (req, res) => {};

const getSarbOverview = async (req, res) => {
  try {
    const url = process.env.SARB_OVERVIEW;
    const data = await sarbOverviewScraper(url);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { postSarbOverview, getSarbOverview };
