"use client";

import Link from "next/link";
import { PiShoppingCartThin } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import {
  ArrowRight,
  LogIn,
  LogOut,
  MapPin,
  MoveRight,
  SlidersHorizontal,
  Table2,
  User,
  UserPlus,
  X,
} from "lucide-react";
import { logoutUser } from "@/actions/auth/login";
import { useContext, useEffect } from "react";
import { ShopContext } from "@/app/context/ShopContext";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { convertToBengaliNumbers } from "@/lib/utils";

export default function IconTray({ user, avatar, userData }) {
  const { cartItems, removeItemFromCart } = useContext(ShopContext);

  return (
    <>
      <div className="flex items-center gap-5">
        <Compare />
        <Tooltip delayDuration={100}>
          <TooltipTrigger>
            <Cart count={cartItems?.length} />
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="max-w-80 border p-3 flex drop-shadow-xl flex-col gap-2 bg-white mt-3 rounded-md"
          >
            {cartItems?.length > 0 ? (
              <>
                {cartItems?.slice(0, 5).map((cartItem, index) => (
                  <div
                    className="flex gap-2 justify-between w-full"
                    key={index}
                  >
                    <div className="flex gap-2">
                      <Link href={`/products/${cartItem.permalLink}`}>
                        <Image
                          src={cartItem.image}
                          width={40}
                          height={40}
                          className="rounded-sm"
                          alt={cartItem.name}
                        />
                      </Link>
                      <div className="flex flex-col">
                        <Link
                          className="text-xs hover:text-primary transition-all font-light"
                          href={`/products/${cartItem.permalLink}`}
                        >
                          {cartItem.name?.slice(0, 25)}{" "}
                          {cartItem.name.length > 25 && "..."}
                        </Link>
                        <span className="text-xs text-neutral-600 font-light">
                          {convertToBengaliNumbers(cartItem.quantity)} x{" "}
                          {convertToBengaliNumbers(
                            Number(cartItem.quantity) * Number(cartItem.price)
                          )}{" "}
                          ৳
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        removeItemFromCart(cartItem.permalLink);
                      }}
                      className="bg-red-500/30 border-red-500/40 text-red-500  opacity-50 border rounded-sm w-fit h-fit"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </>
            ) : (
              <p className="font-light text-sm">কার্ট এ কোন প্রোডাক্ট নেই</p>
            )}
            {cartItems?.length > 5 && (
              <p className="w-full text-center text-xs font-light">
                {/* prettier-ignore */}
                কার্টের {convertToBengaliNumbers(cartItems.length)}
                {"টি প্রোডাক্টের মধ্যে ৫টি এখানে"}
              </p>
            )}
            {cartItems?.length > 0 && (
              <>
                <div className="w-full mt-2">
                  <li className="text-sm flex w-full justify-between">
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
                </div>
                <div className="w-full flex pt-2 justify-between items-center gap-2">
                  <button className="bg-primary  flex items-center gap-2 border border-primary text-white px-3 py-1 text-sm font-extralight rounded-md hover:bg-primary/80 transition-all">
                    কার্ট দেখুন
                  </button>
                  <button className="border-primary group ring-4 w-20 flex justify-center ring-primary/30 shadowText text-sm text-white font-extralight bg-gradient-to-b from-primary/80 overflow-hidden hover:ring-primary/40 to-primary/50 px-3 rounded-md border py-1">
                    <span className="group-hover:opacity-0 transition-all">
                      চেকআউট
                    </span>{" "}
                    <MoveRight
                      className=" -translate-x-14 group-hover:translate-x-0 transition-all -mt-[1px] absolute"
                      strokeWidth={1}
                    />
                  </button>
                </div>
              </>
            )}
          </TooltipContent>
        </Tooltip>
        <Account userData={userData} avatar={avatar} user={user} />
      </div>
    </>
  );
}

const Compare = ({ count = 0 }) => {
  return (
    <Link href={"/compare"} className="flex items-end gap-2">
      <div>
        <span className="font-en bg-primary text-white scale-75 font-medium p-1 -mb-3 translate-x-2 justify-center items-center flex rounded-full text-sm">
          {count}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={28}
          height={28}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-git-compare"
        >
          <circle cx={18} cy={18} r={3} />
          <circle cx={6} cy={6} r={3} />
          <path d="M13 6h3a2 2 0 0 1 2 2v7" />
          <path d="M11 18H8a2 2 0 0 1-2-2V9" />
        </svg>
      </div>
      <span className="font-light hidden sm:block">তুলনা</span>
    </Link>
  );
};

export const Cart = ({ count = 0 }) => {
  return (
    <Link href={"#cart"} className="flex items-end gap-2">
      <div>
        <span className="font-en bg-primary z-10 relative text-white scale-75 font-medium p-1 -mb-3 translate-x-2 justify-center items-center flex rounded-full text-sm">
          {count}
        </span>
        <PiShoppingCartThin className="opacity-60" size={28} />
      </div>
      <span className="font-light hidden sm:block">কার্ট</span>
    </Link>
  );
};

const Account = ({ user, avatar, userData }) => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <div className="items-end gap-2 cursor-pointer hidden md:flex">
            <div className="pt-3 w-7">
              {user ? (
                <>
                  <Image
                    src={
                      avatar ||
                      user?.image ||
                      `/api/og/avatar?avatar=${user?.name?.slice(0, 1)}`
                    }
                    width={30}
                    className="object-cover rounded-full"
                    height={30}
                    alt={user?.name || "Avatar"}
                  />
                </>
              ) : (
                <CiUser className="opacity-60" size={28} />
              )}
            </div>
            <span className="font-light hidden sm:block w-20 text-start !overflow-hidden">
              {userData?.name
                ? userData.name.length > 8
                  ? userData.name.slice(0, 8) + "..."
                  : userData.name
                : user?.name
                ? user.name.length > 8
                  ? user.name.slice(0, 8) + "..."
                  : user.name
                : "অ্যাকাউন্ট"}
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="shadow-none mt-3 flex flex-col z-[99999999999999999999] text-sm font-light gap-2 text-1/80 xl:mr-0 mr-5 w-[160px] border border-gray-300">
          {user ? (
            <>
              {userData?.role === "admin" && (
                <Link href={`/admin`} className="flex gap-3 hover:underline">
                  <Table2 size={20} strokeWidth={1} /> এডমিন প্যানেল
                </Link>
              )}
              <Link href={`/account`} className="flex gap-3 hover:underline">
                <User size={20} strokeWidth={1} /> অ্যাকাউন্ট
              </Link>
              <Link
                href={`/order-tracking`}
                className="flex gap-3 hover:underline"
              >
                <MapPin size={18} strokeWidth={0.8} /> অর্ডার ট্র্যাকিং
              </Link>
              <Link
                href={`/account/edit-account`}
                className="flex gap-3 hover:underline"
              >
                <SlidersHorizontal size={18} strokeWidth={0.8} /> আপডেট প্রোফাইল
              </Link>
              <button
                onClick={async () => await logoutUser()}
                className="flex gap-3 hover:underline"
              >
                <LogOut strokeWidth={1} size={19} className="rotate-180" />
                লগআউট
              </button>
            </>
          ) : (
            <>
              <Link href={`/login`} className="flex gap-3 hover:underline">
                <LogIn size={20} strokeWidth={1} /> লগইন
              </Link>
              <Link className="flex gap-3 hover:underline" href={`/register`}>
                <UserPlus size={20} strokeWidth={1} />
                রেজিস্ট্রেশন
              </Link>
            </>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
};
