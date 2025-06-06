"use server";

import { connectToDB } from "@/lib/connectToDB";
import { convertMongoIdsInArray, errorHandeler } from "@/lib/utils";
import couponModel from "@/models/coupon.model";

export const CreateNewOfferAction = async (data) => {
  try {
    await connectToDB();

    const newCoupon = couponModel(data);
    const res = await newCoupon.save();
    return { succes: true, msg: "সফল ভাবে কুপন অ্যাড হয়ছে" };
  } catch (err) {
    if (err?.code === 11000) {
      return {
        succes: false,
        code: 11000,
        msg: "দুঃখিত এই কুপন কোড ইতিমধ্যে রয়েছে",
      };
    }
    return errorHandeler();
  }
};

export const getOffers = async () => {
  try {
    await connectToDB();

    const now = new Date();

    const res = await couponModel
      .find({ expiryDate: { $gte: now } }) // Only offers that haven't expired
      .select("-couponLimit")
      .lean();

    return { success: true, res: convertMongoIdsInArray(res) };
  } catch (err) {
    return errorHandeler(err);
  }
};
