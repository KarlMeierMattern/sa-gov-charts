import sarbRepoTimelineScraper from "../scraping/sarbTimelineScraper.js";

const testData = [
  {
    name: "Repo rate",
    url: process.env.SARB_REPO_URL,
  },
  {
    name: "Rand per US Dollar",
    url: process.env.SARB_REPO_URL,
  },
  {
    name: "Real GDP growth rate",
    url: process.env.SARB_OTHER_URL,
  },
];

export const getTest = async (req, res) => {
  const data = await sarbRepoTimelineScraper({
    url: testData[2].url,
    text: testData[2].name,
  });
  res.send(data);
};
