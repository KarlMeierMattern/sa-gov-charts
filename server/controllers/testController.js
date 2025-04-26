import testScraper from "../scraping/testScraper.js";

export const getTest = async (req, res) => {
  const data = await testScraper(
    "https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics/current-market-rates"
  );
  res.send(data);
};
