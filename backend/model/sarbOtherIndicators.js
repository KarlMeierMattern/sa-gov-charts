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
  },
  { timestamps: true }
);

export const sarbOtherIndicatorsSchema = new mongoose.model(
  "Other",
  otherSchema
);
