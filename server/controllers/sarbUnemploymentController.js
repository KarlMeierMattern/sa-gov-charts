import { SarbUnemploymentModel } from "../model/index.js";

const getUnemployment = async (req, res) => {
  try {
    const data = await SarbUnemploymentModel.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getUnemployment:", error);
    res.status(500).json({ error: "Failed to retrieve unemployment data" });
  }
};

export { getUnemployment };
