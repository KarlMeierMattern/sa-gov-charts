import { SarbUnemploymentTimelineModel } from "../model/index.js";
import { findSortedTimeline } from "../utils/queryHelpers.js";

const getUnemploymentTimelineData = async (req, res) => {
  try {
    const data = await findSortedTimeline(SarbUnemploymentTimelineModel);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching unemployment timeline data:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve unemployment timeline data" });
  }
};

export { getUnemploymentTimelineData };
