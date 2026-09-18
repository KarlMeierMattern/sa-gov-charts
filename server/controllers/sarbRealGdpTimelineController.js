import { SarbRealGdpTimelineModel } from "../model/index.js";
import { findSortedTimeline } from "../utils/queryHelpers.js";

const getSarbRealGdpTimelineData = async (req, res) => {
  try {
    const data = await findSortedTimeline(SarbRealGdpTimelineModel);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching SARB Real GDP Timeline data:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve SARB Real GDP Timeline data" });
  }
};

export { getSarbRealGdpTimelineData };
