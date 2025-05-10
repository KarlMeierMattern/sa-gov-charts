// https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics/current-market-rates

import { SarbRepoTimelineModel } from "../model/index.js";

const getSarbRepoTimelineData = async (req, res) => {
  try {
    const data = await SarbRepoTimelineModel.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching SARB Repo Timeline data:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve SARB Repo Timeline data" });
  }
};

export { getSarbRepoTimelineData };
