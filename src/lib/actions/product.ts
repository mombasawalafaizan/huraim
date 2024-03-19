"use server";
import { z } from "zod";
import connect from "@/db";
import ProductModel from "@/models/Product";
import { productSchema } from "@/lib/validations/product";
import { getErrorMessage } from "@/lib/handleError";

export async function checkProduct(input: { name: string; id?: string }) {
  await connect();
  try {
    const existingProduct = await ProductModel.findOne({ name: input.name });
    if (existingProduct) {
      throw new Error("Product with the same name already exists!");
    }
    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function addProduct(input: z.infer<typeof productSchema>) {
  await connect();
  try {
    const existingProduct = await ProductModel.findOne({ name: input.name });
    if (existingProduct) {
      throw new Error("Product with the same name already exists!");
    }
    const newProduct = new ProductModel(input);
    await newProduct.save();
    return {
      data: null,
      error: null,
    };
  } catch (err) {
    console.log("From addProduct: \n", err);
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}
