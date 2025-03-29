// https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics

import { SarbOtherModel } from "../model/index.js";

const getSarbOtherIndicatorsController = async (req, res) => {
  try {
    const data = await SarbOtherModel.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching SARB Other Indicators data:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve SARB Other Indicators data" });
  }
};

export { getSarbOtherIndicatorsController };
