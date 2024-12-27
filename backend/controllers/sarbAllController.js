import sarbAllScraper from "../scraping/sarbAllScraper.js";
import { allSarbSchema } from "../model/sarbAllModel.js";

const postSarbAllData = async (req, res) => {
  const url = process.env.SARB_ALL;

  try {
    const scrapedData = await sarbAllScraper(url);
    const savedData = [];

    for (const item of scrapedData) {
      const existingEntry = await allSarbSchema.findOne({
        sector: item.sector,
        period: item.period,
      });

      if (!existingEntry) {
        const savedItem = await allSarbSchema.create(item);
        savedData.push(savedItem);
      }
    }

    res.status(200).json({
      message: "Data successfully saved",
      count: savedData.length,
      data: savedData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSarbAllData = async (req, res) => {
  try {
    const data = await allSarbSchema.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching SARB All data:", error);
    res.status(500).json({ error: "Failed to retrieve SARB data" });
  }
};

export { postSarbAllData, getSarbAllData };
