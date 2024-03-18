import { Document } from "mongoose";
import { type FileWithPath } from "react-dropzone"

export interface ITest extends Document {
  name: string;
}

export type FileWithPreview = FileWithPath & {
  preview: string
}

export enum ProductCategory {
  Perfume = "Perfume",
  RoomFreshener = "Room Freshener",
  Soap = "Soap",
}

export enum MeasurementUnits {
  Kg = "kg",
  Gram = "g",
  Litre = "litre",
  Milliliter = "ml",
}

export enum Genders {
  Male = "Male",
  Female = "Female",
  Unisex = "Unisex",
}

export enum ItemTexture {
  Bar = "Bar",
  Cream = "Cream",
  Lotion = "Lotion",
  Aerosol = "Aerosol",
  Powder = "Powder",
  Liquid = "Liquid",
}

export interface StoredFile {
  id: string;
  name: string;
  url: string;
}

export interface IProduct extends Document {
  MRP: number;
  name: string;
  HSNCode: string;
  gender?: Genders;
  capacity?: number;
  topNotes?: string;
  baseNotes?: string;
  fragrance?: string;
  noOfItems?: number;
  inspiredBy?: string;
  description?: string;
  middleNotes?: string;
  sellingPrice: number;
  returnPolicy?: string;
  images?: StoredFile[];
  texture?: ItemTexture;
  careInstructions?: string;
  countryOfOrigin?: string;
  category?: ProductCategory;
  measurementUnit?: MeasurementUnits;
}
