import {
  JseModel,
  SarbAllModel,
  SarbOtherModel,
  SarbRepoModel,
  SarbRepoTimelineModel,
  SarbFxTimelineModel,
  SarbRealGdpTimelineModel,
  SarbPrimeTimelineModel,
  SarbChangePrimeTimelineModel,
  SarbChangeRepoTimelineModel,
  SarbGoldTimelineModel,
  SarbGbpTimelineModel,
  SarbEuroTimelineModel,
  SarbUnemploymentModel,
  SarbUnemploymentTimelineModel,
} from "../model/index.js";
import { findAllLean, findSortedTimeline } from "../utils/queryHelpers.js";

const getJseData = () =>
  JseModel.find()
    .select("index name value createdAt")
    .sort({ createdAt: -1 })
    .limit(50)
    .lean()
    .exec();

const getDashboardData = async (req, res) => {
  try {
    const [
      sarbOther,
      sarbAll,
      sarbRepo,
      jse,
      sarbRepoTimeline,
      sarbFxTimeline,
      sarbRealGdpTimeline,
      sarbPrimeTimeline,
      sarbChangePrimeTimeline,
      sarbChangeRepoTimeline,
      sarbGoldTimeline,
      sarbGbpTimeline,
      sarbEuroTimeline,
      unemployment,
      unemploymentTimeline,
    ] = await Promise.all([
      findAllLean(SarbOtherModel),
      findAllLean(SarbAllModel),
      findAllLean(SarbRepoModel),
      getJseData(),
      findSortedTimeline(SarbRepoTimelineModel),
      findSortedTimeline(SarbFxTimelineModel),
      findSortedTimeline(SarbRealGdpTimelineModel),
      findSortedTimeline(SarbPrimeTimelineModel),
      findSortedTimeline(SarbChangePrimeTimelineModel),
      findSortedTimeline(SarbChangeRepoTimelineModel),
      findSortedTimeline(SarbGoldTimelineModel),
      findSortedTimeline(SarbGbpTimelineModel),
      findSortedTimeline(SarbEuroTimelineModel),
      findAllLean(SarbUnemploymentModel),
      findSortedTimeline(SarbUnemploymentTimelineModel),
    ]);

    res.status(200).json({
      sarbOther,
      sarbAll,
      sarbRepo,
      jse,
      sarbRepoTimeline,
      sarbFxTimeline,
      sarbRealGdpTimeline,
      sarbPrimeTimeline,
      sarbChangePrimeTimeline,
      sarbChangeRepoTimeline,
      sarbGoldTimeline,
      sarbGbpTimeline,
      sarbEuroTimeline,
      unemployment,
      unemploymentTimeline,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Failed to retrieve dashboard data" });
  }
};

export { getDashboardData };
