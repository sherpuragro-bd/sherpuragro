"use client";

import { socialSignIn } from "@/actions/auth/socialSignIn";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function SocialLogin() {
  const [isLoading, setisLoading] = useState({
    google: false,
    fb: false,
  });
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const handleGoogleSignIn = async (method) => {
    try {
      if (method === "google") {
        await socialSignIn({
          method: "google",
          callBack: `/${redirect || "account"}`,
        });
      } else if (method === "facebook") {
        await socialSignIn({
          method: "facebook",
          callBack: `/${redirect || "account"}`,
        });
      } else {
        return;
      }
    } catch (error) {
    } finally {
      setisLoading({
        google: false,
        fb: true,
      });
    }
  };

  return (
    <div className="w-full flex flex-wrap gap-3 sm:flex-nowrap">
      <button
        onClick={() => {
          setisLoading({
            ...isLoading,
            google: true,
          });
          handleGoogleSignIn("google");
        }}
        type="button"
        className="bg-white flex gap-5 justify-center border hover:bg-stone-100 focus-within:ring-1 ring-offset-2 ring-primary/50 focus-within:border-transparent rounded-md focus-within:-translate-y-1  hover:shadow-xl hover:shadow-primary/10 transition-all px-5 py-2 w-full"
      >
        {isLoading?.google ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <FcGoogle size={20} />
        )}
        <span>গুগল </span>
      </button>
      <button
        onClick={() => {
          setisLoading({
            ...isLoading,
            fb: true,
          });
          handleGoogleSignIn("facebook");
        }}
        type="button"
        className="bg-white justify-center flex gap-5 border hover:bg-stone-100 focus-within:ring-1 ring-offset-2 ring-primary/50 focus-within:border-transparent rounded-md  focus-within:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all px-5 py-2 w-full"
      >
        <FaFacebook color="#4267B2" size={20} />
        <span>ফেসবুক</span>
      </button>
    </div>
  );
}
