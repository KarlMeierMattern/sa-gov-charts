// https://www.jse.co.za/

// import jseIndexScraper from "../scraping/jseIndexScraper.js";
import { jseIndex } from "../model/jseIndexModel.js";

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

export { getJseIndex };
