// https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics

import { SarbChangePrimeTimelineModel } from "../model/index.js";

const getSarbChangePrimeTimelineData = async (req, res) => {
  try {
    const data = await SarbChangePrimeTimelineModel.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching SARB Change Prime Timeline data:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve SARB Change Prime Timeline data" });
  }
};

export { getSarbChangePrimeTimelineData };
