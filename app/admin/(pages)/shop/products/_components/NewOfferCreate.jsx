"use client";

import { Input } from "@/app/components/ui/Input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Asterisk, Calendar, Loader2, Percent, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Label } from "@/app/components/ui/Label";
import { useForm } from "react-hook-form";
import LineErro from "@/app/components/ui/LineErro";
import { useEffect, useState } from "react";
import { CreateNewOfferAction } from "@/actions/admin/Coupon";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const NewOfferCreate = () => {
  const [isDialogOpen, setisDialogOpen] = useState(false);
  const [isCreating, setisCreating] = useState();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const couponType = watch("couponType");

  useEffect(() => {
    if (couponType === "shipping") {
      setValue("amountOrPercent", "");
    }
  }, [couponType, setValue]);

  const onSubmit = async (data) => {
    if (!couponType) {
      return setError("couponType", {
        message: "কুপন টাইপ সিলেক্ট করুন",
      });
    }

    setisCreating(true);
    const res = await CreateNewOfferAction(data);
    if (res?.succes) {
      setisDialogOpen(false);
      toast.success(res?.msg);
      router.refresh();
    }
    if (!res?.succes) {
      if (res?.code === 11000) {
        setError("couponCode", {
          message: res?.msg,
        });
        setValue("couponCode", "");
      }
    }
    setisCreating(false);
  };

  const validateDate = (value) => {
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today || "শুধুমাত্র আজকের বা ভবিষ্যতের তারিখ দিন";
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setisDialogOpen}>
      <DialogTrigger asChild>
        <Button>নিউ কুপন </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>নিউ অফার অ্যাড করুন</DialogTitle>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <Input
            icon={<Asterisk />}
            label={`কুপন কোড`}
            required={true}
            placeholder={`কোড`}
            {...register("couponCode", {
              required: "কুপন কোড অবশ্যই দিন",
              minLength: {
                value: 6,
                message: "কমপক্ষে ৬ অক্ষরের কুপন দিন",
              },
              maxLength: {
                value: 12,
                message: "সর্বোচ্চ ১২ অক্ষরের কুপন দিন",
              },
            })}
          >
            {errors.couponCode && (
              <LineErro className="text-red-500 text-sm mt-6 -mb-5">
                {errors.couponCode.message}
              </LineErro>
            )}
          </Input>

          <Input
            icon={<Calendar />}
            type="date"
            required={true}
            label={"মেয়াদ উর্তীন্ন ডেট "}
            placeholder={`কুপন এক্সপিরে`}
            {...register("expiryDate", {
              required: true,
              validate: validateDate,
            })}
          >
            {errors.expiryDate && (
              <LineErro className="text-red-500 text-sm mt-6 -mb-5">
                {errors.expiryDate.message}
              </LineErro>
            )}
          </Input>

          <div className="-mb-3">
            <div className="space-y-2">
              <Label required={true}>কুপন টাইপ</Label>
              <Select
                onValueChange={(val) => {
                  setValue("couponType", val);
                  clearErrors("couponType");
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="টাইপ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shipping">ফ্রী ডেলিভারি</SelectItem>
                  <SelectItem value="percentage">% ডিসকাউন্ট </SelectItem>
                  <SelectItem value="fixed">ফিক্সড</SelectItem>
                </SelectContent>
              </Select>
              {errors.couponType && (
                <LineErro className="text-red-500 text-sm mt-2">
                  {errors.couponType.message}
                </LineErro>
              )}
            </div>

            <AnimatePresence>
              {couponType && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="ml-2 border-l-2 border-primary mt-3"
                >
                  <div className="pl-2">
                    {couponType === "shipping" ? (
                      <p className="text-sm">এই কুপন টি ফ্রী ডেলিভারি</p>
                    ) : (
                      <>
                        <Input
                          className="!py-1"
                          icon={
                            couponType === "fixed" ? (
                              <FaBangladeshiTakaSign size={20} />
                            ) : (
                              <Percent />
                            )
                          }
                          placeholder={
                            couponType === "fixed" ? "ছাড় মূল্য " : "শতাংশ"
                          }
                          {...register("amountOrPercent", {
                            required: "এই ফিল্ডটি অবশ্যই পূরণ করুন",
                            validate: (value) => {
                              const num = Number(value);
                              if (isNaN(num)) return "সঠিক সংখ্যা দিন";
                              if (couponType === "percentage") {
                                if (num <= 0) return "শতাংশ ১ এর বেশি হতে হবে";
                                if (num > 100)
                                  return "শতাংশ ১০০ এর বেশি হতে পারবে না";
                              }
                              if (couponType === "fixed") {
                                if (num <= 0)
                                  return "ছাড় মূল্য ১ টাকার বেশি হতে হবে";
                              }
                              return true;
                            },
                          })}
                        />
                        <span className="w-full h-4 flex" />
                        {errors.amountOrPercent && (
                          <LineErro className="text-red-500 text-sm mt-2">
                            {errors.amountOrPercent.message}
                          </LineErro>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Input
            icon={<User />}
            label="কুপন লিমিট"
            type="number"
            required={true}
            placeholder={" লিমিট "}
            {...register("couponLimit", {
              required: true,
              validate: (value) => {
                const num = Number(value);
                if (isNaN(num)) return "সঠিক সংখ্যা দিন";

                if (value < 1) {
                  return "সর্বনিম্ন ১ জন ";
                }
                return true;
              },
            })}
          >
            {errors?.couponLimit && (
              <LineErro className="text-red-500 text-sm mt-6 -mb-5">
                {errors.couponLimit.message}
              </LineErro>
            )}
          </Input>

          <Button type="submit">
            {isCreating ? <Loader2 className="animate-spin" /> : "অ্যাড করুন "}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewOfferCreate;
