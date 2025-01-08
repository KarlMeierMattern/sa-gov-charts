// https://www.jse.co.za/

import jseIndexScraper from "../scraping/jseIndexScraper.js";
import { jseIndex } from "../model/jseIndexModel.js";

const postJseIndex = async (req, res) => {
  const url = process.env.JSE;

  try {
    const scrapedData = await jseIndexScraper(url);
    const savedData = [];

    for (const item of scrapedData) {
      const existingEntry = await jseIndex.findOne({
        index: item.index.toString(),
        name: item.name,
      });

      if (!existingEntry) {
        const savedItem = await jseIndex.create(item);
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

const getJseIndex = async (req, res) => {
  try {
    const data = await jseIndex.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching JSE All Share Index data:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve JSE All Share Index data" });
  }
};

export { postJseIndex, getJseIndex };
