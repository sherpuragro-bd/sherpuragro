import { connectToDB } from "@/lib/connectToDB";
import ProductModel from "@/models/product.model";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  await connectToDB();
  const res = await ProductModel.find({
    isPopular: true,
    status: "published",
  })
    .sort({ createdAt: -1 })
    .select(
      " -description -content -stock -minQuantity -maxQuantity -tags -seoTitle -seoDes -seoImage -isPopular -createdAt -updatedAt"
    );
  return NextResponse.json(res);
};
