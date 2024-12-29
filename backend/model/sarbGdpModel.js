import mongoose from "mongoose";

const gdpSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    data: {
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
        type: Number,
        required: true,
        default: "N/A",
      },
      previousPeriod: {
        type: Number,
        required: true,
        default: "N/A",
      },
      percentageChange: {
        type: Number,
        required: true,
        default: "N/A",
      },
    },
  },
  { timestamps: true } // Optional: adds createdAt and updatedAt timestamps
);

export const sarbGdpSchema = mongoose.model("Gdp", gdpSchema);
