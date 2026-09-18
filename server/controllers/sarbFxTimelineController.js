import { SarbFxTimelineModel } from "../model/index.js";
import { findSortedTimeline } from "../utils/queryHelpers.js";

const getSarbFxTimelineData = async (req, res) => {
  try {
    const data = await findSortedTimeline(SarbFxTimelineModel);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching SARB USD Timeline data:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve SARB USD Timeline data" });
  }
};

export { getSarbFxTimelineData };
