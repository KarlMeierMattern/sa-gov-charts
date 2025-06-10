import sarbRepoTimelineScraper from "../scraping/sarbTimelineScraper.js";
import sarbRepoScraper from "../scraping/sarbRepoScraper.js";

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

// export const getTest = async (req, res) => {
//   const data = await sarbRepoTimelineScraper({
//     url: testData[0].url,
//     text: testData[0].name,
//   });
//   res.send(data);
// };

export const getTest = async (req, res) => {
  const data = await sarbRepoScraper(process.env.SARB_REPO_URL);
  res.send(data);
};
