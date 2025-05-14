// https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics/current-market-rates

import { SarbGbpTimelineModel } from "../model/index.js";

const getSarbGbpTimelineData = async (req, res) => {
  try {
    const data = await SarbGbpTimelineModel.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching SARB Gbp Timeline data:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve SARB Gbp Timeline data" });
  }
};

export { getSarbGbpTimelineData };
