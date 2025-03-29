// https://resbank.co.za/en/home/what-we-do/statistics/releases/national-summary-data-page

import { SarbAllModel } from "../model/index.js";

const getSarbAllData = async (req, res) => {
  try {
    const data = await SarbAllModel.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching SARB All data:", error);
    res.status(500).json({ error: "Failed to retrieve SARB data" });
  }
};

export { getSarbAllData };
