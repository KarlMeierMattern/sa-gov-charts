import mongoose from "mongoose";

const unemploymentSchema = new mongoose.Schema({
  unemploymentRate: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

export const SarbUnemploymentModel = mongoose.model(
  "sarb_unemployment",
  unemploymentSchema
);
