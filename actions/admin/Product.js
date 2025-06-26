"use server";

import { connectToDB } from "@/lib/connectToDB";
import { convertMongoIdsInArray, errorHandeler } from "@/lib/utils";
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
    return convertMongoIdsInArray(res);
  } catch (err) {
    errorHandeler();
  }
};

export const getAllProductDataForAdmin = async () => {
  try {
    await connectToDB();

    const totalProducts = await ProductModel.countDocuments();
    const products = await ProductModel.find()
      .select(
        "name _id permalLink images stock price discountPrice status createdAt updatedAt"
      )
      .lean();
    return convertMongoIdsInArray(products);
  } catch (err) {
    errorHandeler(err);
    return null;
  }
};

export const deleteProduct = async (id) => {
  try {
    await connectToDB();
    await ProductModel.findByIdAndDelete(id);
    return { success: true, msg: "প্রোডাক্টি সফলভাবে ডিলিট হয়েছে" };
  } catch {
    errorHandeler();
  }
};

export const deleteManyProducts = async (ids) => {
  try {
    await connectToDB();
    await ProductModel.deleteMany({ _id: { $in: ids } });
    return { success: true, msg: "প্রোডাক্টস সফলভাবে ডিলিট হয়েছে" };
  } catch {
    errorHandeler();
  }
};
