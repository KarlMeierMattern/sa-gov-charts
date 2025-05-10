// https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics

import { SarbRealGdpTimelineModel } from "../model/index.js";

const getSarbRealGdpTimelineData = async (req, res) => {
  try {
    const data = await SarbRealGdpTimelineModel.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching SARB Real GDP Timeline data:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve SARB Real GDP Timeline data" });
  }
};

export { getSarbRealGdpTimelineData };
