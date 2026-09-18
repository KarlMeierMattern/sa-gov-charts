import { SarbUnemploymentModel } from "../model/index.js";
import { findAllLean } from "../utils/queryHelpers.js";

const getUnemployment = async (req, res) => {
  try {
    const data = await findAllLean(SarbUnemploymentModel);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getUnemployment:", error);
    res.status(500).json({ error: "Failed to retrieve unemployment data" });
  }
};

export { getUnemployment };
