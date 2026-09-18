import { SarbEuroTimelineModel } from "../model/index.js";
import { findSortedTimeline } from "../utils/queryHelpers.js";

const getSarbEuroTimelineData = async (req, res) => {
  try {
    const data = await findSortedTimeline(SarbEuroTimelineModel);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching SARB Euro Timeline data:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve SARB Euro Timeline data" });
  }
};

export { getSarbEuroTimelineData };
