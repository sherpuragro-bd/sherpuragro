"use server";

import { connectToDB } from "@/lib/connectToDB";
import { errorHandeler } from "@/lib/utils";
import { userModel } from "@/models/user.model";
import { getServerSession } from "next-auth";

export const getAccountData = async () => {
  try {
    await connectToDB();

    const user = await getServerSession();
    if (!user?.user?.email) {
      return null;
    }
    const userData = await userModel
      .findOne({ email: user?.user?.email })
      .select("-password -image -isActive -status")
      .lean();

    return { ...userData, _id: userData?._id?.toString() };
  } catch (err) {
    errorHandeler();
  }
};
