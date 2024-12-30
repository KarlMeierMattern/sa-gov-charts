// https://www.resbank.co.za/en/home/what-we-do/statistics/releases/economic-and-financial-data-for-south-africa

import mongoose from "mongoose";

const gdpSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
      default: "N/A",
    },
    unitDescription: {
      type: String,
      required: true,
      default: "N/A",
    },
    dateOfLatest: {
      type: String,
      required: true,
      default: "N/A",
    },
    latestData: {
      type: String,
      required: true,
      default: "N/A",
    },
    previousPeriod: {
      type: String,
      required: true,
      default: "N/A",
    },
    percentageChange: {
      type: String,
      required: true,
      default: "N/A",
    },
  },
  { timestamps: true } // Optional: adds createdAt and updatedAt timestamps
);

export const sarbGdpSchema = mongoose.model("Gdp", gdpSchema);
