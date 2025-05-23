import sarbRepoTimelineScraper from "../scraping/sarbTimelineScraper.js";

const testData = [
  {
    name: "Repo rate",
    url: process.env.SARB_REPO_URL,
  },

  {
    name: "Prime lending rate",
    url: process.env.SARB_REPO_URL,
  },
  {
    name: "Real GDP growth rate",
    url: process.env.SARB_OTHER_URL,
  },
  {
    name: "Dates of change in the repurchase rate",
    url: process.env.SARB_OTHER_URL,
  },
  {
    name: "Dates of change in the prime lending rate",
    url: process.env.SARB_OTHER_URL,
  },
  {
    name: "US Dollar",
    url: process.env.SARB_REPO_URL,
  },
  {
    name: "Rand per US Dollar",
    url: process.env.SARB_REPO_URL,
  },
  {
    name: "Rand per British Pound",
    url: process.env.SARB_REPO_URL,
  },
  {
    name: "Rand per Euro",
    url: process.env.SARB_REPO_URL,
  },
];

export const getTest = async (req, res) => {
  const data = await sarbRepoTimelineScraper({
    url: testData[9].url,
    text: testData[9].name,
  });
  res.send(data);
};
