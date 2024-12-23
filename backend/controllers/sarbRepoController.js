import extractMarketRates from "../scraping/extractMarketRates.js";

const sarbRepoController = async (req, res) => {
  const url =
    "https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics/current-market-rates";

  try {
    // Extract the market rates
    const data = await extractMarketRates(url);

    res.status(200).json(data); // Return the results directly
  } catch (error) {
    console.error("Error scraping SARB website:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch data from the SARB website" });
  }
};

export { sarbRepoController };
