import { connectToDB } from "@/lib/connectToDB";
import { SliderModel } from "@/models/slider.model";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  await connectToDB();
  const res = await SliderModel.find({}).lean();
  return NextResponse.json(res);
};
