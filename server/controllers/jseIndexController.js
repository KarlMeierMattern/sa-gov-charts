// https://www.jse.co.za/

import { JseModel } from "../model/index.js";

const getJseIndex = async (req, res) => {
  try {
    // Optimize query with limit, sort, and select only needed fields
    const data = await JseModel.find()
      .select("index name value createdAt")
      .sort({ createdAt: -1 })
      .limit(50) // Reasonable limit even for small datasets
      .lean() // Convert to plain JavaScript objects (faster than Mongoose documents)
      .exec(); // Explicitly execute for better performance

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching JSE All Share Index data:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve JSE All Share Index data" });
  }
};

export { getJseIndex };
