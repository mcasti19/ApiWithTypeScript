import mongoose, { Schema } from "mongoose";
import { Revenue } from "../types/RevenueType";

const RevenueSchema: Schema = new Schema<Revenue>(
  {
    month: {
      type: String
    },
    revenue: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const RevenueModel = mongoose.model<Revenue>("revenues", RevenueSchema);