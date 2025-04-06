"use server";

import { connectToDB } from "@/lib/connectToDB";
import { errorHandeler, replaceMongoIdInArray } from "@/lib/utils";
import ProductModel from "@/models/product.model";

export const createNewProduct = async (payload) => {
  try {
    await connectToDB();
    const newProduct = ProductModel(payload);
    const product = await newProduct.save();
    return { success: true, msg: "প্রোডাক্ট সফল ভাবে সংরক্ষণ হয়েছে" };
  } catch (err) {
    return errorHandeler();
  }
};

export const getAllPopularProducts = async () => {
  try {
    await connectToDB();
    const res = await ProductModel.find({
      isPopular: true,
      status: "published",
    })
      .sort({ createdAt: -1 })
      .select(
        " -description -content -stock -minQuantity -maxQuantity -tags -seoTitle -seoDes -seoImage -isPopular -createdAt -updatedAt"
      );
    return replaceMongoIdInArray(res);
  } catch (err) {
    errorHandeler();
  }
};
