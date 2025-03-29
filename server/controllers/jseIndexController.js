// https://www.jse.co.za/

import { JseModel } from "../model/index.js";

const getJseIndex = async (req, res) => {
  try {
    const data = await JseModel.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching JSE All Share Index data:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve JSE All Share Index data" });
  }
};

export { getJseIndex };
