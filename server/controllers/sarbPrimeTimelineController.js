// https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics/current-market-rates

import { SarbPrimeTimelineModel } from "../model/index.js";

const getSarbPrimeTimelineData = async (req, res) => {
  try {
    const data = await SarbPrimeTimelineModel.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching SARB Prime Timeline data:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve SARB Prime Timeline data" });
  }
};

export { getSarbPrimeTimelineData };
