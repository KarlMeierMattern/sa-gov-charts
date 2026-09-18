import { SarbRepoTimelineModel } from "../model/index.js";
import { findSortedTimeline } from "../utils/queryHelpers.js";

const getSarbRepoTimelineData = async (req, res) => {
  try {
    const data = await findSortedTimeline(SarbRepoTimelineModel);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching SARB Repo Timeline data:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve SARB Repo Timeline data" });
  }
};

export { getSarbRepoTimelineData };
