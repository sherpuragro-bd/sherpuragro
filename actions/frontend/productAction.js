"use server";

import { connectToDB } from "@/lib/connectToDB";
import { errorHandeler, replaceMongoIdInArray } from "@/lib/utils";
import { AddressModel } from "@/models/address.model";
import ProductModel from "@/models/product.model";
import { getServerSession } from "next-auth";

export const getProductDetails = async (permalLink) => {
  try {
    await connectToDB();

    const product = await ProductModel.findOne({
      permalLink,
      status: "published",
    }).lean();

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

export const searchProducts = async (search) => {
  try {
    await connectToDB();

    const products = await ProductModel.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ],
      status: "published",
    })
      .sort({ createdAt: -1 })
      .select("name images discountPrice price permalLink")
      .lean()
      .limit(5);

    if (!products) return null;

    return await replaceMongoIdInArray(products);
  } catch (err) {
    errorHandeler(err);
  }
};

export const getAddressCount = async () => {
  try {
    await connectToDB();
    const user = await getServerSession();
    const count = await AddressModel.countDocuments({
      email: user?.user?.email,
    });
    return count;
  } catch (err) {
    errorHandeler();
  }
};
