import { SarbPrimeTimelineModel } from "../model/index.js";
import { findSortedTimeline } from "../utils/queryHelpers.js";

const getSarbPrimeTimelineData = async (req, res) => {
  try {
    const data = await findSortedTimeline(SarbPrimeTimelineModel);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching SARB Prime Timeline data:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve SARB Prime Timeline data" });
  }
};

export { getSarbPrimeTimelineData };
