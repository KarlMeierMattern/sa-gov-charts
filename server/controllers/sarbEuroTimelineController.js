// https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics/current-market-rates

import { SarbEuroTimelineModel } from "../model/index.js";

const getSarbEuroTimelineData = async (req, res) => {
  try {
    const data = await SarbEuroTimelineModel.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching SARB Euro Timeline data:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve SARB Euro Timeline data" });
  }
};

export { getSarbEuroTimelineData };
