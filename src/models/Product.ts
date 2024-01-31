import {
  Genders,
  IProduct,
  ItemTexture,
  ProductCategory,
  MeasurementUnits,
} from "@/types";
import mongoose, { Model, Schema } from "mongoose";

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: Object.values(ProductCategory),
  },
  capacity: {
    type: Number,
  },
  measurementUnit: {
    type: String,
    enum: Object.values(MeasurementUnits),
  },
  inspiredBy: {
    type: String,
  },
  topNotes: {
    type: String,
  },
  baseNotes: {
    type: String,
  },
  middleNotes: {
    type: String,
  },
  fragrance: {
    type: String,
  },
  returnPolicy: {
    type: String,
  },
  careInstructions: {
    type: String,
  },
  sellingPrice: {
    type: Number,
    required: true,
  },
  MRP: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: Object.values(Genders),
  },
  noOfItems: {
    type: Number,
  },
  texture: {
    type: String,
    enum: Object.values(ItemTexture),
  },
  countryOfOrigin: {
    type: String,
  },
  HSNCode: {
    type: String,
    required: true,
  },
  images: [
    {
      name: String,
      url: String,
    },
  ],
});

const ProductModel: Model<IProduct> =
  mongoose.models.Products || mongoose.model("Products", productSchema);

export default ProductModel;
