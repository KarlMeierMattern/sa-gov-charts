// https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics

import mongoose from "mongoose";

const changeRepoTimelineSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const SarbChangeRepoTimelineModel = mongoose.model(
  "sarb_change_repo_timeline",
  changeRepoTimelineSchema
);
