"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { generateWhatsAppLink } from "@/lib/utils";
import { Minus, Plus, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const ProductActions = ({ data }) => {
  const minQty =
    typeof data?.minQuantity === "number" && data.minQuantity >= 0
      ? data.minQuantity
      : 1;

  const maxQty =
    typeof data?.maxQuantity === "number"
      ? data.maxQuantity
      : typeof data?.stock === "number"
      ? data.stock
      : 1000;

  const [cartQuantity, setcartQuantity] = useState(
    data?.minQuantity === 0 ? 1 : minQty
  );

  return data.stock === "stockout" ? (
    <div className="space-y-1">
      <div className="bg-yellow-400/50 border items-center p-2 px-3 text-yellow-600 rounded-md border-yellow-400">
        😓 দুঃখিত এই প্রোডাক্ট টি ইতি মধ্যে আমাদের স্টকে নেই
      </div>
      <div className="bg-primary/20 border items-center p-2 px-3  rounded-md border-primary/70">
        <p className="text-sm font-light text-text">
          প্রোডাক্টটি আবার স্টকে আনতে অনুগ্রহ করে আমাদেরকে{" "}
          <Link
            className="underline font-normal text-primary"
            target="_blank"
            href={generateWhatsAppLink({
              phoneNumber: "8801704297078",
              customMsg: `প্রোডাক্ট নাম: ${data.name} - প্রোডাক্ট লিংক: https://www.sherpuragro.com/products/${data.permalLink} - স্টক আনার জন্য অনুরোধ করছি`,
            })}
          >
            অবহিত করুন
          </Link>{" "}
        </p>
      </div>
    </div>
  ) : (
    <div className="md:static flex flex-wrap  justify-between items-center gap-3 fixed max-[350px]:flex-col w-full max-[350px]:bottom-12 bottom-20 bg-white left-0 px-5 py-2 z-[999999]">
      <div className="w-full flex h-20 -mt-20 -mb-5  bg-gradient-to-b from-transparent to-white fixed bottom-[10rem] md:hidden"></div>
      <ProductCart
        stock={data.stock}
        maxQuantity={maxQty}
        minQuantity={minQty}
        cartQuantity={cartQuantity}
        setcartQuantity={setcartQuantity}
      />
      <div className="flex gap-2 z-50 items-center max-[450px]:w-full">
        <Dialog>
          <DialogTrigger>
            <div className="px-5 z-40 max-[450px]:text-sm flex-grow flex items-center py-2 bg-gradient-to-br from-primary to-primary/50 border border-primary rounded-md text-white font-light">
              অর্ডার করুন
            </div>
          </DialogTrigger>
          <DialogContent className="w-60 rounded-xl min-[350px]:w-80 z-[999999999999999999999999999999999999999999999999999999999999999999999999999999999999]">
            <div className="space-y-1">
              <DialogTitle>অর্ডার এর মাধ্যম</DialogTitle>
              <DialogDescription>
                আপনি যে মেথদ এ অর্ডার করতে চান দয়া করে তা বাসাই করুন
              </DialogDescription>
            </div>
            <div className="space-y-2">
              <button className="px-5 flex justify-center items-center gap-2 py-2 bg-slate-100 border rounded-md w-full">
                <ShoppingBasket size={20} /> কার্টে অ্যাড করুন
              </button>
              <Link
                target="_blank"
                className="flex"
                href={generateWhatsAppLink({
                  phoneNumber: "8801704297078",
                  productName: data.name,
                  price: data.discountPrice || data.price,
                  quantity: cartQuantity,
                  productURL: `https://www.sherpuragro.com/products/${data.permalLink}`,
                })}
              >
                <button className="px-5 flex-wrap justify-center leading-4 text-white flex font-light items-center gap-2 py-2  bg-[#075e54] border rounded-md w-full">
                  <FaWhatsapp size={20} /> হোয়াটসঅ্যাপে অর্ডার করুন
                </button>
              </Link>
            </div>
          </DialogContent>
        </Dialog>
        <button className="px-5 z-40 max-[450px]:text-sm py-2 border border-text max-[450px]:flex-grow bg-text text-white rounded-md">
          অ্যাড টু কার্ট
        </button>
      </div>
    </div>
  );
};

export default ProductActions;

export const ProductCart = ({
  cartQuantity,
  setcartQuantity,
  maxQuantity,
  minQuantity,
  stock,
}) => {
  const handleDecrease = () => {
    if (cartQuantity > minQuantity) {
      setcartQuantity(cartQuantity - 1);
    }
  };

  const handleIncrease = () => {
    if (typeof maxQuantity !== "number" || cartQuantity < maxQuantity) {
      setcartQuantity(cartQuantity + 1);
    }
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    if (isNaN(value)) return;

    if (value < minQuantity) {
      setcartQuantity(minQuantity);
    } else if (typeof maxQuantity === "number" && value > maxQuantity) {
      setcartQuantity(maxQuantity);
    } else {
      setcartQuantity(value);
    }
  };

  return (
    stock !== "stockout" && (
      <div className="max-[450px]:w-full z-40 max-[450px]:text-sm flex flex-grow md:flex-grow-0 md:w-60 justify-between border rounded-md">
        <button
          onClick={handleDecrease}
          className="max-[450px]:py-1 p-2 transition-all border-r bg-slate-200/30 hover:bg-slate-200"
        >
          <Minus className="max-[450px]:scale-75" />
        </button>
        <input
          value={cartQuantity}
          onChange={handleChange}
          className="w-full py-2 font-en max-[450px]:text-sm text-xl font-semibold text-center"
          type="number"
          min={minQuantity}
          {...(typeof maxQuantity === "number" && { max: maxQuantity })}
        />
        <button
          onClick={handleIncrease}
          className="p-2 max-[450px]:py-1 transition-all border-l bg-slate-200/30 hover:bg-slate-200"
        >
          <Plus className="max-[450px]:scale-75" />
        </button>
      </div>
    )
  );
};
