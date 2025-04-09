"use server";

import { connectToDB } from "@/lib/connectToDB";
import { errorHandeler } from "@/lib/utils";
import ProductModel from "@/models/product.model";

export const getProductDetails = async (permalLink) => {
  try {
    await connectToDB();

    const product = await ProductModel.findOne({ permalLink: permalLink });
    return { ...product._doc, _id: product._id.toString() };
  } catch (err) {
    errorHandeler();
  }
};
