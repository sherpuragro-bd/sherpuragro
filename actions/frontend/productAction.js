"use server";

import { connectToDB } from "@/lib/connectToDB";
import { errorHandeler, replaceMongoIdInArray } from "@/lib/utils";
import ProductModel from "@/models/product.model";

export const getProductDetails = async (permalLink) => {
  try {
    await connectToDB();

    const product = await ProductModel.findOne({ permalLink }).lean();

    if (!product) return null;

    return {
      ...product,
      _id: `${product._id}`,
      categories: replaceMongoIdInArray(product.categories),
    };
  } catch (err) {
    errorHandeler(err);
    return null;
  }
};
