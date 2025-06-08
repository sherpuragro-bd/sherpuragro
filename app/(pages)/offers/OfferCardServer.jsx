import { getOffers } from "@/actions/admin/Coupon";
import Image from "next/image";
import { convertToBengaliNumbers } from "@/lib/utils";
import React from "react";
import RibonImg from "../../../public/img/ribon.png";
import RibbonDesign from "../../../public/img/ribondesign.png";
import CopyToClipBoard from "./CopyToClipBoard";
import { Skeleton } from "@/components/ui/skeleton";

const colorVariants = [
  {
    border: "border-orange-200",
    bg: "bg-orange-100",
    innerBg: "bg-orange-300/80",
    text: "text-orange-400",
  },
  {
    border: "border-red-200",
    bg: "bg-red-100",
    innerBg: "bg-red-300/80",
    text: "text-red-500",
  },
  {
    border: "border-sky-200",
    bg: "bg-sky-100",
    innerBg: "bg-sky-300/80",
    text: "text-sky-700",
  },
  {
    border: "border-primary/50",
    bg: "bg-primary/20",
    innerBg: "bg-green-300/40",
    text: "text-primary",
  },
];

const OfferCardServer = async () => {
  const offers = await getOffers();

  return (
    <>
      {offers?.res?.length > 0 ? (
        <>
          {offers.res.map((offer, index) => {
            const { couponType, amountOrPercent, couponCode, expiryDate } =
              offer;

            const variant = colorVariants[index % colorVariants.length];

            return (
              <React.Fragment key={offer?._id}>
                <div
                  className={`gap-5 inbs relative col-span-12 sm:col-span-6  lg:col-span-4 flex flex-col border ${variant.border} ${variant.bg} rounded-2xl`}
                >
                  <div className="flex w-full absolute inset-0 items-center justify-between">
                    <span className="w-9 h-9 rounded-full bg-white flex relative -left-6" />
                    <span className="w-9 h-9 rounded-full bg-white flex relative left-6" />
                  </div>
                  <div className="w-full flex">
                    <div
                      className={`py-8 ${variant.innerBg} w-5/12 text-white flex justify-center items-center rounded-l-[14px]`}
                    >
                      <h4
                        className={`text-4xl ${variant.text} font-light z-10 relative`}
                      >
                        {couponType === "shipping" ? (
                          <>ফ্রি</>
                        ) : (
                          <>
                            {couponType === "percentage"
                              ? `${convertToBengaliNumbers(amountOrPercent)}%`
                              : `${convertToBengaliNumbers(amountOrPercent)}৳`}
                          </>
                        )}
                      </h4>
                    </div>
                    <div className="w-2 h-[100%] relative -mt-[1px] flex items-center justify-center max-[300px]:hidden">
                      <Image layout="fill" src={RibonImg} alt="Offer Ribon" />
                    </div>
                    <div className="flex items-center h-full -ml-7 z-20 max-[300px]:hidden">
                      <Image
                        src={RibbonDesign}
                        width={50}
                        height={50}
                        alt="Offer Ribon"
                      />
                    </div>
                    <div className="p-3 z-20 relative flex flex-col gap-2">
                      <h3
                        className={` ${variant.text} text-xl font-light z-10 relative`}
                      >
                        {couponType === "shipping" ? (
                          <>ফ্রি ডেলিভারি</>
                        ) : (
                          <>
                            {couponType === "percentage"
                              ? `${convertToBengaliNumbers(
                                  amountOrPercent
                                )}% শতাংশ ছাড়`
                              : `${convertToBengaliNumbers(
                                  amountOrPercent
                                )}৳ মূল্য ছাড়`}
                          </>
                        )}
                      </h3>
                      <CopyToClipBoard
                        variant={variant}
                        couponCode={couponCode}
                      />
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </>
      ) : null}
    </>
  );
};

export default OfferCardServer;

export function OfferCardSkeleton({ index }) {
  const variant = colorVariants[index % colorVariants.length];

  return (
    <div
      className={`gap-5 relative col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col border ${variant.border} ${variant.bg} rounded-2xl `}
    >
      {/* White Ribbon Circles */}
      <div className="flex w-full absolute inset-0 items-center justify-between">
        <span className="w-9 h-9 rounded-full bg-white relative -left-6" />
        <span className="w-9 h-9 rounded-full bg-white relative left-6" />
      </div>

      <div className="w-full flex">
        {/* Colored left section */}
        <div
          className={`py-8 ${variant.innerBg} w-5/12 flex justify-center items-center rounded-l-[14px]`}
        >
          <Skeleton className={`h-8 w-16 ${variant.text}`} />
        </div>

        {/* Ribbon image skeleton */}
        <div className="w-2 h-full relative max-[300px]:hidden">
          <Skeleton className="w-full bg-gradient-to-br from-yellow-500 to-yellow-300 h-full absolute rounded-none" />
        </div>

        {/* Decorative ribbon design image skeleton */}
        <div className="flex items-center h-full -ml-7 z-20 max-[300px]:hidden">
          {/* <Skeleton className="w-[50px] h-[50px] rounded-full" /> */}
          <Image src={RibbonDesign} width={50} height={50} alt="Offer Ribon" />
        </div>

        {/* Text content area */}
        <div className="p-3 z-20 relative flex flex-col gap-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
    </div>
  );
}
