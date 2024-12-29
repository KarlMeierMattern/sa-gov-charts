import sarbGdpScraper from "../scraping/sarbGdpScraper.js";
import { sarbGdpSchema } from "../model/sarbGdpModel.js";

const postSarbGdpData = async (req, res) => {
  const url = process.env.SARB_GDP_URL; // Your SARB URL
  const ids = [
    "#NRI6631L",
    "#NRI6632L",
    "#NRI6634L",
    "#NRI6635L",
    "#NRI6636L",
    "#NRI6638L",
    "#NRI6639L",
    "#NRI6640L",
    "#NRI6647L",
    "#NRI6643L",
    "#NRI6645L",
    "#NRI6006L",
    "#NRI6007L",
    "#NRI6008L",
    "#NRI6009L",
    "#NRI6010L",
    "#NRI6011L",
    "#NRI6012L",
    "#NRI6013L",
    "#NRI6014L",
    "#MPR0000B",
    "#DIFN003A",
    "#LABP900L",
    "#LABT079A",
    "#LABP130L",
    "#CPI1000A",
    "#PPI1000A",
  ]; // Add more IDs as needed

  try {
    // Call the scraper function and fetch the scraped data for each ID
    const results = await Promise.all(
      ids.map(async (id) => {
        const data = await sarbGdpScraper(url, id); // Scrape the data
        return {
          id,
          industry: data.industry,
          unitDescription: data.unitDescription,
          dateOfLatest: data.dateOfLatest,
          latestData: data.latestData,
          previousPeriod: data.previousPeriod,
          percentageChange: data.percentageChange,
        };
      })
    );

    // Ensure that only unique ID entries are saved
    for (const result of results) {
      const existingEntry = await sarbGdpSchema.findOne({ id: result.id });

      if (!existingEntry) {
        // Save the data if the entry with the same ID doesn't already exist
        await sarbGdpSchema.create(result);
      }
    }

    // Send the response back to the client
    res.status(200).json({ message: "Data successfully saved", data: results });
  } catch (error) {
    console.error("Error scraping and saving SARB data:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch and save data from the SARB website" });
  }
};

// You may also have a getter for retrieving saved data:
const getSarbGdpData = async (req, res) => {
  try {
    const data = await sarbGdpSchema.find(); // Fetch all data from the database
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching SARB GDP data:", error);
    res.status(500).json({ error: "Failed to retrieve SARB GDP data" });
  }
};

export { postSarbGdpData, getSarbGdpData };
