import unemploymentScraper from "../scraping/unemploymentScraper.js";

export const getUnemployment = async (req, res) => {
  try {
    const data = await unemploymentScraper(process.env.SARB_UNEMPLOYMENT);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getUnemployment:", error);
    res.status(500).json({ error: "Failed to retrieve unemployment data" });
  }
};
