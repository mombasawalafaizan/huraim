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
  name: z.string().min(3).max(70),
  capacity: z.number().positive().optional(),
  category: z.enum(Object.values(ProductCategory) as [string, ...string[]]),
  measurementUnit: z.enum(
    Object.values(MeasurementUnits) as [string, ...string[]]
  ),
  inspiredBy: z.string().optional(),
  topNotes: z.string().optional(),
  baseNotes: z.string().optional(),
  middleNotes: z.string().optional(),
  fragrance: z.string().optional(),
  returnPolicy: z.string().optional(),
  careInstructions: z.string().optional(),
  sellingPrice: z
    .number()
    .positive()
    .refine(
      (value) => {
        const decimalPart = (value.toString().split(".")[1] || "").length;
        return decimalPart <= 2;
      },
      {
        message: "Number should have at most 2 decimal places",
      }
    ),
  MRP: z
    .number()
    .positive()
    .refine(
      (value) => {
        const decimalPart = (value.toString().split(".")[1] || "").length;
        return decimalPart <= 2;
      },
      {
        message: "Number should have at most 2 decimal places",
      }
    ),
  gender: z.enum(Object.values(Genders) as [string, ...string[]]),
  noOfItems: z.number().int().positive().min(1).optional(),
  texture: z
    .enum(Object.values(ItemTexture) as [string, ...string[]])
    .optional(),
  countryOfOrigin: z.string().default("India"),
  HSNCode: z.string(),
  images: z.array(storedFileSchema).optional(),
});
