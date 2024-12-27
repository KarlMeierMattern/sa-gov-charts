import sarbRealGdpScraper from "../scraping/sarbRealGdpScraper.js";

const postSarbRealGdpController = async (req, res) => {};

const getSarbRealGdpController = async (req, res) => {
  try {
    const url = process.env.SARB_REAL_GDP;
    const data = await sarbRealGdpScraper(url);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { postSarbRealGdpController, getSarbRealGdpController };
