import mongoose, { Schema } from "mongoose";
import { Invoice } from "../types/InvoicesTypes";

const InvoicesSchema: Schema = new Schema<Invoice>(
  {
    amount: {
      type: Number
    },
    status: {
      type: String
    },
    date: {
      type: Date
    },
    customer: {
      ref: "customers",
      type: mongoose.Schema.Types.ObjectId
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const InvoicesModel = mongoose.model<Invoice>("invoices", InvoicesSchema);