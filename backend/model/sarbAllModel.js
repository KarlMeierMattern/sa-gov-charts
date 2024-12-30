// https://resbank.co.za/en/home/what-we-do/statistics/releases/national-summary-data-page

import mongoose from "mongoose";

const allSchema = mongoose.Schema(
  {
    sector: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    period: {
      type: String,
      required: true,
    },
    currentValue: {
      type: Number,
      required: true,
    },
    previousValue: {
      type: Number,
      required: true,
    },
    percentageChange: {
      type: Number,
      required: true,
      set: (v) => (isNaN(v) ? 0 : v),
    },
    source: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const allSarbSchema = mongoose.model("allSarbData", allSchema);
