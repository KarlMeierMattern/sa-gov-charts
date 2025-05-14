// https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics/current-market-rates

import { SarbFxTimelineModel } from "../model/index.js";

const getSarbFxTimelineData = async (req, res) => {
  try {
    const data = await SarbFxTimelineModel.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching SARB USD Timeline data:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve SARB USD Timeline data" });
  }
};

export { getSarbFxTimelineData };
