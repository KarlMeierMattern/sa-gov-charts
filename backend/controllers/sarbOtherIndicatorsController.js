import sarbOtherIndicatorsScraper from "../scraping/sarbOtherIndicatorsScraper.js";

const postSarbOtherIndicatorsController = async (req, res) => {};

const getSarbOtherIndicatorsController = async (req, res) => {
  try {
    const url = process.env.SARB_REAL_GDP;
    const data = await sarbOtherIndicatorsScraper(url);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { postSarbOtherIndicatorsController, getSarbOtherIndicatorsController };
