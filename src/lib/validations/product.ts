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
  name: z.string().min(3, {
    message: "Must be at least 1 character",
  }),
  capacity: z
    .number()
    .int()
    .positive({ message: "Capacity must be a positive number" })
    .min(0)
    .optional(),
  category: z
    .enum(Object.values(ProductCategory) as [string, ...string[]])
    .default(ProductCategory.Perfume),
  measurementUnit: z.enum(
    Object.values(MeasurementUnits) as [string, ...string[]]
  ),
  description: z.string(),
  inspiredBy: z.string().optional(),
  topNotes: z.string().optional(),
  baseNotes: z.string().optional(),
  middleNotes: z.string().optional(),
  fragrance: z.string().optional(),
  returnPolicy: z.string().optional(),
  careInstructions: z.string().optional(),
  sellingPrice: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Must be a valid price",
  }),
  MRP: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Must be a valid price",
  }),
  gender: z.enum(Object.values(Genders) as [string, ...string[]]),
  noOfItems: z.number().int().positive().min(1).optional(),
  texture: z
    .enum(Object.values(ItemTexture) as [string, ...string[]])
    .optional(),
  countryOfOrigin: z.string().default("India"),
  HSNCode: z.string({ required_error: "HSN Code is required" }),
  images: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false;
      if (val.some((file) => !(file instanceof File))) return false;
      return true;
    }, "Must be an array of File")
    .optional()
    .nullable()
    .default(null),
});
