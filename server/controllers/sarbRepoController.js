import { SarbRepoModel } from "../model/index.js";
import { findAllLean } from "../utils/queryHelpers.js";

const getSarbRepoData = async (req, res) => {
  try {
    const data = await findAllLean(SarbRepoModel);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching SARB repo data:", error);
    res.status(500).json({ error: "Failed to retrieve SARB repo data" });
  }
};

export { getSarbRepoData };
