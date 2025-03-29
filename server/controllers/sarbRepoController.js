// https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics/current-market-rates

import { sarbRepoSchema } from "../model/sarbRepoModel.js";

const getSarbRepoData = async (req, res) => {
  try {
    const data = await sarbRepoSchema.find(); // Fetch all data from the database
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching SARB GDP data:", error);
    res.status(500).json({ error: "Failed to retrieve SARB GDP data" });
  }
};

export { getSarbRepoData };
