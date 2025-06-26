"use client";

import Alert from "@/app/components/ui/Alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";

const DeleteAccount = () => {
  return (
    <>
      <div className="w-full p-5 border border-red-300/70 bg-red-50 rounded-xl">
        <div className="flex gap-5 max-[350px]:flex-col">
          <div className="w-10 h-10 flex justify-center items-center bg-red-200/70 rounded-md">
            <Trash className="text-red-500" strokeWidth={1.4} />
          </div>
          <div>
            <h3 className="text-red-500 text-lg">ডিলিট একাউন্ট </h3>
            <p className="-mt-2 text-text/70">
              আপনার অ্যাকাউন্ট এবং এর সাথে সম্পর্কিত সমস্ত ডেটা স্থায়ীভাবে
              ডিলিট ফেলুন।
            </p>
          </div>
        </div>
        <hr className="my-5" />
        <Alert variant="warning" className="!bg-yellow-100/30 mb-5">
          এই পদক্ষেপটি আপনার অ্যাকাউন্ট এবং সংশ্লিষ্ট সমস্ত ডেটা স্থায়ীভাবে
          মুছে ফেলবে এবং এটি অপরিবর্তনীয়। এগিয়ে যাওয়ার আগে দয়া করে নিশ্চিত
          হয়ে নিন।
        </Alert>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="error">
              <Trash /> অ্যাকাউন্ট ডিলিট করুন
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[500px]">
            <div className="flex gap-3 min-[350px]:items-center max-[350px]:flex-col">
              <div className="w-10 h-10 flex justify-center items-center bg-red-200/70 rounded-md">
                <Trash className="text-red-500" strokeWidth={1.4} />
              </div>
              <div>
                <DialogTitle className="text-red-500">
                  ডিলিট একাউন্ট
                </DialogTitle>
                <DialogDescription>
                  এই পদক্ষেপ পূর্বাবস্থায় ফেরানো যাবে না।
                </DialogDescription>
              </div>
            </div>
            <Alert>
              আপনার অ্যাকাউন্ট মুছে ফেলার বিষয়টি নিশ্চিত করার জন্য আমরা আপনাকে
              একটি ইমেল পাঠাবো। একবার আপনি নিশ্চিত করলে, আপনার অ্যাকাউন্ট
              স্থায়ীভাবে মুছে ফেলা হবে এবং আপনার সমস্ত ডেটা হারিয়ে যাবে।
            </Alert>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default DeleteAccount;
