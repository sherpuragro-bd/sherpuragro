import { convertToBengaliNumbers } from "@/lib/utils";
import { Infinity } from "lucide-react";
import ProductShortDes from "./ProductShortDes";
import ProductActions from "./ProductActions";
import { Label } from "@/app/components/ui/Label";
import Link from "next/link";
import { ShopContextProvider } from "@/app/context/ShopContext";

const ProductDetails = ({ data }) => {
  return (
    <>
      <div className="w-full md:w-5/12 space-y-5">
        <div>
          <span className="border flex  w-fit gap-1 p-1 px-3 rounded-md">
            {!isNaN(data.stock) ? (
              <>
                ইন স্টক{" "}
                <span className="text-primary">
                  {convertToBengaliNumbers(data.stock)}
                </span>
              </>
            ) : data.stock === "stockin" ? (
              <>
                স্টক ইন <Infinity strokeWidth={1.5} className="text-primary" />
              </>
            ) : (
              <>
                <span className="text-red-600">আউট অফ স্টক</span>
              </>
            )}
          </span>
        </div>
        <h2 className="text-4xl">{data.name}</h2>
        {data?.description && (
          <ProductShortDes className="font-light" text={data?.description} />
        )}
        <div className="flex gap-2 items-end">
          <span className="text-4xl text-primary">
            {data?.discountPrice
              ? convertToBengaliNumbers(data?.discountPrice)
              : convertToBengaliNumbers(data?.price)}
            ৳
          </span>
          <div className="flex flex-col">
            {data.discountPrice && (
              <>
                {data.discountPrice < data.price && (
                  <span className="text-sm -mb-2 text-yellow-500 font-light">
                    {convertToBengaliNumbers(
                      Math.round(
                        ((data.price - data.discountPrice) / data.price) * 100
                      )
                    )}
                    % ডিস্কাউন্ট
                  </span>
                )}
                <span className="line-through text-xl">
                  {convertToBengaliNumbers(data?.price)}৳
                </span>
              </>
            )}
          </div>
        </div>
        <ProductActions data={data} />
      </div>
    </>
  );
};

export default ProductDetails;
