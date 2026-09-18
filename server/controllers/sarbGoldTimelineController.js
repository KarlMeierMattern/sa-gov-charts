import { SarbGoldTimelineModel } from "../model/index.js";
import { findSortedTimeline } from "../utils/queryHelpers.js";

const getSarbGoldTimelineData = async (req, res) => {
  try {
    const data = await findSortedTimeline(SarbGoldTimelineModel);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching SARB Gold Timeline data:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve SARB Gold Timeline data" });
  }
};

export { getSarbGoldTimelineData };
