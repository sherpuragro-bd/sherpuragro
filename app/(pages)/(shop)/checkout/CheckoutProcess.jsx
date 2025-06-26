"use client";

import toast, { ErrorIcon, Toaster } from "react-hot-toast";
import { Input } from "@/app/components/ui/Input";
import NumberInput from "@/app/components/ui/NumberInput";
import DistrictAndUpazila from "@/app/account/_components/DistrictAndUpazila";
import { useContext, useEffect, useState } from "react";
import { districtsData } from "@/public/data/District";
import { upazilasData } from "@/public/data/Upazila";
import { Label } from "@/app/components/ui/Label";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Minus, Plus, Store, Wallet, X } from "lucide-react";
import { ShopContext } from "@/app/context/ShopContext";
import { useRouter } from "next/navigation";
import ExitWarning from "@/app/components/widgets/ExitAlert";
import Link from "next/link";
import { convertToBengaliNumbers } from "@/lib/utils";
import Image from "next/image";

const CheckoutProcess = ({ user }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: user?.email || "",
    phone: "",
    postalCode: "",
    address: "",
  });

  const {
    cartItems,
    cartTotalPrice,
    updateProductQuanity,
    removeItemFromCart,
  } = useContext(ShopContext);

  const [selectedDistrict, setselectedDistrict] = useState(null);
  const [selectedUpazila, setselectedUpazila] = useState(null);
  const [filteredUpazilas, setfilteredUpazilas] = useState([]);
  const [isAnyError, setisAnyError] = useState();
  const [deliveryOption, setdeliveryOption] = useState();
  const [toTalPrice, settoTalPrice] = useState();

  useEffect(() => {
    if (selectedDistrict?.value) {
      setselectedUpazila(null);
      const upazilasFiltered = upazilasData
        .filter((up) => up.district_id === selectedDistrict.value.id)
        .map((upazila) => ({
          value: {
            name: upazila.name,
            id: upazila.id,
          },
          label: upazila.bn_name,
        }));
      setfilteredUpazilas(upazilasFiltered);
    } else {
      setfilteredUpazilas([]);
      setselectedUpazila(null);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (deliveryOption === "cashOnDelivery" && cartTotalPrice < 500) {
      setdeliveryOption(null);
    }
  }, [cartTotalPrice, deliveryOption]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.phone ||
      !formData.postalCode.trim() ||
      !formData.address.trim() ||
      !selectedDistrict?.value?.name ||
      !selectedUpazila?.value?.name
    ) {
      setisAnyError(true);
      return;
    }

    const fullData = {
      ...formData,
      district: selectedDistrict.value.name,
      upazila: selectedUpazila.value.name,
    };

    console.log("Form submitted:", fullData);
    setisAnyError(false);
  };

  const districtOptions = districtsData.map((district) => ({
    value: {
      name: district.name,
      id: district.id,
    },
    label: district.bn_name,
  }));

  const router = useRouter();

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="w-full py-40 flex justify-center flex-col gap-10 items-center h-screen  z-[999999] bg-white">
          <Loader2 size={50} strokeWidth={1} className=" animate-spin" />
          <div className="space-y-2">
            <h2 className="text-2xl">
              আপনাকে প্রোডাক্টস পেজে রিডাইরেক্ট করা হচ্ছে
            </h2>
          </div>
          {router.push("/shop")}
        </div>
      ) : (
        <>
          <section className="flex justify-center w-full">
            <Toaster position="top-right" />
            <div className="max-w-primary w-full flex flex-col lg:flex-row justify-between gap-5 p-5 pt-10">
              <div className="w-full lg:w-8/12">
                <div>
                  <h2 className="text-2xl">শিপিং ইনফর্মেশন</h2>
                  <p>
                    অর্ডার টি সম্পূর্ণ করার জন্য নিচের সকল ইনফর্মেশন পূরণ করুন
                  </p>
                </div>
                <span className="w-full flex h-[1px] bg-border my-5" />
                <div className="gap-5 flex items-center">
                  <h4 className="text-xl">ব্যক্তিগত এবং শিপিং ইনফরমেশন</h4>
                </div>
                <div className="pl-5">
                  <form
                    onSubmit={onSubmit}
                    className="md:border-l gap-5 border-primary/50 grid-cols-2 md:p-5 grid"
                  >
                    <div className="col-span-2 md:col-span-1">
                      <Input
                        label="নাম"
                        className="!px-3"
                        placeholder="আপনার নাম"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <Input
                        label="ইমেইল"
                        className="!bg-gray-100 !px-3"
                        value={formData.email}
                        disabled
                      />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <NumberInput
                        placeholder="মোবাইল নাম্বার"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                      />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <Input
                        label="পোস্টাল কোড"
                        className="!px-3"
                        type="number"
                        placeholder="পোস্টাল কোড"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-2 md:col-span-1 space-y-2 -mt-2">
                      <Label required={true}>জেলা</Label>
                      <DistrictAndUpazila
                        setAddress={setselectedDistrict}
                        value={selectedDistrict}
                        options={districtOptions}
                        placeholder="জেলা নির্বাচন করুন"
                      />
                    </div>

                    <div className="col-span-2 md:col-span-1 space-y-2 -mt-2">
                      <Label required={true}>উপজেলা</Label>
                      <DistrictAndUpazila
                        setAddress={setselectedUpazila}
                        value={selectedUpazila}
                        options={filteredUpazilas}
                        placeholder={
                          filteredUpazilas?.length
                            ? "উপজেলা নির্বাচন করুন"
                            : "জেলা নির্বাচন করুন প্রথমে"
                        }
                      />
                    </div>

                    <div className="col-span-2">
                      <Input
                        required={true}
                        label="ঠিকানা"
                        className="!px-3"
                        placeholder="ঠিকানা"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-2 w-full">
                      <div className="w-full pb-5">
                        <h4 className="my-4">ডেলিভারি এবং পেমেন্ট পদ্ধতি </h4>
                        <div className="flex items-center w-full flex-wrap gap-3">
                          <button
                            disabled={cartTotalPrice < 500}
                            onClick={() => {
                              if (!cartTotalPrice < 500) {
                                setdeliveryOption("cashOnDelivery");
                                return;
                              }
                            }}
                            className={`p-3 px-5 border rounded-lg w-full transition-all items-center flex gap-5 ${
                              deliveryOption === "cashOnDelivery"
                                ? "border-primary/50"
                                : ""
                            } ${
                              cartTotalPrice < 500
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            type="button"
                          >
                            <Wallet />
                            <div className="-space-y-1 w-full gap-10 flex justify-between items-center">
                              <h2>ক্যাশঅন ডেলিভারি</h2>
                              <span
                                className={`w-3 h-3  rounded-full ring-offset-2 ${
                                  deliveryOption === "cashOnDelivery"
                                    ? "bg-primary ring-2 ring-primary/50 "
                                    : "bg-gray-400 ring-2 ring-gray-300"
                                }`}
                              />
                            </div>
                          </button>
                          <button
                            onClick={() => setdeliveryOption("shopPickkUp")}
                            className={`p-3 px-5 border rounded-lg w-full transition-all items-center flex gap-5 ${
                              deliveryOption === "shopPickkUp"
                                ? "border-primary/50"
                                : ""
                            }`}
                            type="button"
                          >
                            <Store strokeWidth={1.5} />
                            <div className="-space-y-1 w-full gap-10 flex justify-between items-center">
                              <h2>পিকআপ করুন</h2>
                              <span
                                className={`w-3 h-3  rounded-full ring-offset-2 ${
                                  deliveryOption === "shopPickkUp"
                                    ? "bg-primary ring-2 ring-primary/50 "
                                    : "bg-gray-400 ring-2 ring-gray-300"
                                }`}
                              />
                            </div>
                          </button>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="bg-primary text-white px-4 py-2 rounded"
                      >
                        সাবমিট করুন
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="w-full lg:w-4/12 border h-fit p-10 rounded-xl">
                <h2 className="text-2xl mb-5">আপনার অর্ডার</h2>
                <div className="flex flex-col gap-5 max-h-[360px]  pb-5 pr-2 overflow-y-auto">
                  {cartItems?.length >= 0 &&
                    cartItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between w-full py-2  border-gray-200"
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
                              className="text-lg leading-none hover:text-primary transition-all font-normal"
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
                <div className="w-full py-2"></div>

                <div className="w-full border-t py-2 flex justify-between items-center">
                  <h2 className="text-lg">মোট মূল্য</h2>
                  <span className="text-2xl text-primary">
                    {convertToBengaliNumbers(cartTotalPrice)} ৳
                  </span>
                </div>
              </div>
            </div>
          </section>
          <ExitWarning />
        </>
      )}
      <AnimatePresence>
        {isAnyError && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{
              type: "tween",
            }}
            exit={{ y: 100 }}
            className="bg-orange-500 fixed bottom-0 gap-2 p-5 py-3 font-light flex justify-between items-center text-white z-[99] w-full"
          >
            <br />
            <span className="flex items-center gap-2">
              {" "}
              <ErrorIcon
                style={{
                  background: "red",
                }}
              />
              সকল ইনফরমেশন পূরণ করুন
            </span>
            <button
              onClick={() => {
                setisAnyError(false);
              }}
            >
              <X />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CheckoutProcess;
