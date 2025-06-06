"use client";
import { Copy, Check } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CountUp from "react-countup";
import { convertToBengaliNumbers } from "@/lib/utils";

const CopyToClipBoard = ({ couponCode, variant }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(couponCode);
      toast.success(`কপি করা হয়েছে`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`border flex border-dashed overflow-hidden items-center gap-2 bg-white/40 font-mono rounded-md pl-5 cursor-pointer transition-colors ${variant.border}`}
    >
      {couponCode}
      <div className={`px-2 py-2 ${variant.innerBg} ${variant.text}`}>
        {copied ? <Check size={12} /> : <Copy size={12} />}
      </div>
    </button>
  );
};

export default CopyToClipBoard;
