import { connectToDB } from "@/lib/connectToDB";
import { convertMongoIdsInArray } from "@/lib/utils";
import CategoryModel from "@/models/category.model";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  await connectToDB();
  const allCategories = await CategoryModel.find()
    .lean()
    .select("-descriptionCategory -publicity -seoDescription -seoTitle");
  return NextResponse.json(
    convertMongoIdsInArray(
      allCategories?.sort(
        (a, b) => (a.order ?? Infinity) - (b.order ?? Infinity)
      )
    )
  );
};
