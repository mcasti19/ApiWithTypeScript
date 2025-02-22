import mongoose, { Schema } from "mongoose";
import { Product } from "../types/ProductTypes";


const ProductSchema: Schema = new Schema<Product>(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    price: {
      type: Number
    },
    img_url: {
      type: String
    },
    status: {
      type: Boolean
    },
    stock: {
      type: Number
    },
    category: {
      type: String
    },
    tags: {
      type: [ String ]
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const ProductModel = mongoose.model<Product>("Products", ProductSchema);
