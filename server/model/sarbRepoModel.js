// https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics/current-market-rates

import mongoose from "mongoose";

const repoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastPeriod: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const SarbRepoModel = mongoose.model("sarb_repo", repoSchema);
