import { SarbGbpTimelineModel } from "../model/index.js";
import { findSortedTimeline } from "../utils/queryHelpers.js";

const getSarbGbpTimelineData = async (req, res) => {
  try {
    const data = await findSortedTimeline(SarbGbpTimelineModel);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching SARB GBP Timeline data:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve SARB GBP Timeline data" });
  }
};

export { getSarbGbpTimelineData };
