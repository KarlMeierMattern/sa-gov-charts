import sarbRepoScraper from "../scraping/sarbRepoScraper.js";
import { sarbRepoSchema } from "../model/sarbRepoModel.js";

const postSarbRepoData = async (req, res) => {
  const url = process.env.SARB_REPO_URL;

  try {
    // Extract the market rates
    const data = await sarbRepoScraper(url);

    // Loop through each scraped data and insert it into the database
    const parsedData = data.map((item) => ({
      name: item.Name,
      lastPeriod: item.Date,
      value: item.Value,
    }));

    // Ensure that only unique ID entries are saved
    for (const result of parsedData) {
      // Check if the record with the same name and lastPeriod (or another unique field) already exists
      const existingEntry = await sarbRepoSchema.findOne({
        name: result.name,
        lastPeriod: result.lastPeriod,
      });

      if (!existingEntry) {
        // Save the data if the entry with the same name and lastPeriod doesn't already exist
        await sarbRepoSchema.create(result);
      }
    }

    res.status(200).json({ message: "Data successfully scraped and saved" });
  } catch (error) {
    console.error("Error scraping SARB website:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch data from the SARB website" });
  }
};

const getSarbRepoData = async (req, res) => {
  try {
    const data = await sarbRepoSchema.find(); // Fetch all data from the database
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching SARB GDP data:", error);
    res.status(500).json({ error: "Failed to retrieve SARB GDP data" });
  }
};

export { postSarbRepoData, getSarbRepoData };
