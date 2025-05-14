// https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics/current-market-rates

import mongoose from "mongoose";

const fxTimelineSchema = new mongoose.Schema(
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

// Add static method to get data sorted by date
fxTimelineSchema.statics.getSortedData = async function () {
  return this.find().sort({ date: 1 }); // 1 for ascending order (oldest to newest)
};

export const SarbFxTimelineModel = mongoose.model(
  "sarb_fx_timeline",
  fxTimelineSchema
);
