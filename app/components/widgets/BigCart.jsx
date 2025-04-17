"use client";

import { ShopContext } from "@/app/context/ShopContext";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
} from "@/components/ui/sheet";
import { convertToBengaliNumbers } from "@/lib/utils";
import { Minus, Plus, ShoppingBasket, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

const BigCart = () => {
  const { cartItems, updateProductQuanity, removeItemFromCart } =
    useContext(ShopContext);

  return (
    <>
      <SheetContent
        className={`z-[999999999999999999999999999] max-[450px]:w-full`}
      >
        <SheetTitle>কার্ট</SheetTitle>
        <SheetDescription>
          আপনার অ্যাড করা সকল প্রোডাক্ট এই কার্ট এর মধ্যে রয়েছে
        </SheetDescription>
        <div className="w-full h-full flex justify-center items-center pb-24">
          {cartItems?.length === 0 && (
            <div className="text-center flex flex-col items-center">
              <ShoppingBasket size={100} strokeWidth={1} />
              <h2 className="text-xl">কোনো প্রোডাক্ট নেই</h2>
              <p className="font-light">
                দুঃখিত আপনার কার্ট এ কোনও প্রোডাক্ট নেই{" "}
              </p>
            </div>
          )}
          {cartItems?.length > 0 && (
            <div className="flex w-full h-full flex-col items-center gap-3 overflow-y-scroll mt-5">
              {cartItems?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between w-full py-2 border-b border-gray-200"
                >
                  <div className="flex items-center w-full justify-between">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className=" border rounded-md"
                    />
                    <div className="ml-4 w-full">
                      <Link
                        href={`/products/${item.permalLink}`}
                        className="text-lg leading-none hover:text-primary transition-all font-medium"
                      >
                        {item.name?.slice(0, 20)}...
                      </Link>
                      <div className="flex items-center justify-between flex-grow">
                        <div>
                          <span className="text-lg text-primary">
                            {convertToBengaliNumbers(item.price)} ৳
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              removeItemFromCart(item.permalLink);
                            }}
                            className="bg-red-500/30 border-red-500/40 text-red-500  opacity-50 border rounded-sm w-fit h-fit"
                          >
                            <X size={20} />
                          </button>
                          <div className="flex items-center border rounded-sm gap-1 justify-between">
                            <button
                              onClick={() =>
                                updateProductQuanity(
                                  item.permalLink,
                                  item.quantity - 1
                                )
                              }
                              className="bg-slate-100 rounded-sm"
                            >
                              <Minus />
                            </button>
                            <span className="text-sm text-gray-500">
                              {convertToBengaliNumbers(item.quantity)}
                            </span>
                            <button
                              onClick={() =>
                                updateProductQuanity(
                                  item.permalLink,
                                  item.quantity + 1
                                )
                              }
                              className="bg-slate-100 rounded-sm"
                            >
                              <Plus />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <SheetFooter className={` bottom-0 w-full pb-5 absolute`}>
          {cartItems?.length > 0 ? (
            <>
              <li className="text-sm flex w-full justify-between mb-2 pr-10">
                <span>মোট </span>
                <span className="text-neutral-400 font-light">
                  {convertToBengaliNumbers(
                    cartItems?.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                  )}
                  ৳
                </span>
              </li>
              <Link className="flex w-full pr-10" href={`/`}>
                <button className="bg-gradient-to-br from-primary text-white px-5 w-full py-2 to-primary/50 border border-primary rounded-md ring-4 ring-primary/20">
                  চেকআউট করুন
                </button>
              </Link>
            </>
          ) : (
            <Link href={`/products`} className="flex w-full pr-10">
              <button className="bg-gradient-to-br w-full text-white from-primary py-2 to-primary/50 border border-primary rounded-md ring-4 ring-primary/20">
                প্রোডাক্টস দেখুন
              </button>
            </Link>
          )}
        </SheetFooter>
      </SheetContent>
    </>
  );
};

export default BigCart;
