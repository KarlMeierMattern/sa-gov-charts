// https://www.jse.co.za/

import mongoose from "mongoose";

const jseSchema = new mongoose.Schema(
  {
    index: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
      index: true, // Add index for faster lookups
    },
    value: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    // Add compound index for common query patterns
    indexes: [
      { name: 1, createdAt: -1 },
      { createdAt: -1 }, // For time-based queries
    ],
  }
);

export const JseModel = mongoose.model("jse", jseSchema);
