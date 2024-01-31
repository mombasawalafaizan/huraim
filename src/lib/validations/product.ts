import {
  Genders,
  ItemTexture,
  MeasurementUnits,
  ProductCategory,
} from "@/types";
import * as z from "zod";

// Define Zod schema for the images object
export const storedFileSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});

// Define Zod schema for the product
export const productSchema = z.object({
  name: z.string(),
  category: z
    .enum(Object.values(ProductCategory) as [string, ...string[]])
    .optional(),
  capacity: z.number().optional(),
  measurementUnit: z
    .enum(Object.values(MeasurementUnits) as [string, ...string[]])
    .optional(),
  inspiredBy: z.string().optional(),
  topNotes: z.string().optional(),
  baseNotes: z.string().optional(),
  middleNotes: z.string().optional(),
  fragrance: z.string().optional(),
  returnPolicy: z.string().optional(),
  careInstructions: z.string().optional(),
  sellingPrice: z.number(),
  MRP: z.number(),
  gender: z.enum(Object.values(Genders) as [string, ...string[]]).optional(),
  noOfItems: z.number().optional(),
  texture: z
    .enum(Object.values(ItemTexture) as [string, ...string[]])
    .optional(),
  countryOfOrigin: z.string().default("India").optional(),
  HSNCode: z.string(),
  images: z.array(storedFileSchema).optional(),
});
