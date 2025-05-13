// https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics

import mongoose from "mongoose";

const changePrimeTimelineSchema = new mongoose.Schema(
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

export const SarbChangePrimeTimelineModel = mongoose.model(
  "sarb_change_prime_timeline",
  changePrimeTimelineSchema
);
