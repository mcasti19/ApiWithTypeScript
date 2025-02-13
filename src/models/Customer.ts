import mongoose, { Schema } from "mongoose";
import { Customer } from "../types/CustomerTypes";


const CustomerSchema: Schema = new Schema<Customer>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    image_url: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const CustomerModel = mongoose.model<Customer>("customers", CustomerSchema);