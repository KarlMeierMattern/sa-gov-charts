// https://www.jse.co.za/

import mongoose from "mongoose";

const jseSchema = mongoose.Schema(
  {
    index: {
      type: Number,
      required: true,
    },
    name: {
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

export const jseIndex = mongoose.model("jseIndex", jseSchema, "jse");
