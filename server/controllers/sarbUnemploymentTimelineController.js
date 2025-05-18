import { SarbUnemploymentTimelineModel } from "../model/index.js";

const getUnemploymentTimelineData = async (req, res) => {
  try {
    const data = await SarbUnemploymentTimelineModel.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getUnemploymentTimeline:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve unemployment timeline data" });
  }
};

export { getUnemploymentTimelineData };
