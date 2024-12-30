// https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics

import sarbOtherIndicatorsScraper from "../scraping/sarbOtherIndicatorsScraper.js";
import { sarbOtherIndicatorsSchema } from "../model/sarbOtherIndicators.js";

const postSarbOtherIndicatorsController = async (req, res) => {
  try {
    const url = process.env.SARB_OTHER;
    const data = await sarbOtherIndicatorsScraper(url);

    // Loop through each scraped data and insert it into the database
    const parsedData = data.map((item) => ({
      name: item.Date,
      value: item.Value,
    }));

    for (const result of parsedData) {
      const existingEntry = await sarbOtherIndicatorsSchema.findOne({
        name: result.name,
        value: result.value,
      });
      if (!existingEntry) {
        await sarbOtherIndicatorsSchema.create(result);
      }
    }

    res.status(200).json({ message: "Data successfully scraped and saved" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSarbOtherIndicatorsController = async (req, res) => {
  try {
    const data = await sarbOtherIndicatorsSchema.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching SARB Other Indicators data:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve SARB Other Indicators data" });
  }
};

export { postSarbOtherIndicatorsController, getSarbOtherIndicatorsController };
