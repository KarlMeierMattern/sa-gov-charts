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
    },
    value: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const JseModel = mongoose.model("jse", jseSchema);
