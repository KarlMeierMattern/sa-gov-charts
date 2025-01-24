// https://www.resbank.co.za/en/home/what-we-do/monetary-policy
// This controller is not being used

import sarbOverviewScraper from "../scraping/sarbOverviewScraper.js";

const postSarbOverview = async (req, res) => {};

// CHANGE 1
const getSarbOverview = async (req, res) => {
  try {
    const url = process.env.SARB_OVERVIEW;
    const data = await sarbOverviewScraper(url);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { postSarbOverview, getSarbOverview };
