// https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics

import mongoose from "mongoose";

const otherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const SarbOtherModel = mongoose.model("sarb_other", otherSchema);
