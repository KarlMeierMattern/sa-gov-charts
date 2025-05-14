// https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics/current-market-rates

import { SarbGoldTimelineModel } from "../model/index.js";

const getSarbGoldTimelineData = async (req, res) => {
  try {
    const data = await SarbGoldTimelineModel.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching SARB Gold Timeline data:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve SARB Gold Timeline data" });
  }
};

export { getSarbGoldTimelineData };
