import { SarbChangeRepoTimelineModel } from "../model/index.js";
import { findSortedTimeline } from "../utils/queryHelpers.js";

const getSarbChangeRepoTimelineData = async (req, res) => {
  try {
    const data = await findSortedTimeline(SarbChangeRepoTimelineModel);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching SARB Change Repo Timeline data:", error);
    res.status(500).json({
      error: "Failed to retrieve SARB Change Repo Timeline data",
    });
  }
};

export { getSarbChangeRepoTimelineData };
