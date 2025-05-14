// https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics

import mongoose from "mongoose";

const realGdpTimelineSchema = new mongoose.Schema(
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
realGdpTimelineSchema.statics.getSortedData = async function () {
  return this.find().sort({ date: 1 }); // 1 for ascending order (oldest to newest)
};

export const SarbRealGdpTimelineModel = mongoose.model(
  "sarb_real_gdp_timeline",
  realGdpTimelineSchema
);
