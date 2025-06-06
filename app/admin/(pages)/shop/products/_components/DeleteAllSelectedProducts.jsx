"use client";

import { deleteManyProducts } from "@/actions/admin/Product";
import { Input } from "@/app/components/ui/Input";
import { AdminContext } from "@/app/context/AdminContext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Key, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import toast from "react-hot-toast";

const DeleteAllSelectedProducts = () => {
  const { selectedProducts, setselectedProducts } = useContext(AdminContext);
  const router = useRouter();

  const handelDeleteAll = async (e) => {
    e.preventDefault();
    const key = e.target.key.value;

    if (key !== "DELETE SELECTED PRODUCTS") {
      toast.error("সঠিক কোড টাইপ করুন");
      return;
    }

    const res = await deleteManyProducts(selectedProducts);
    setselectedProducts([]);
    router.refresh();
    toast.success(res.msg);
  };

  return (
    <Dialog>
      <DialogTrigger className={`flex`}>
        <div
          className={`flex items-center gap-2 px-3 rounded-md text-white ${
            selectedProducts?.length > 0
              ? "cursor-pointer bg-red-500 "
              : "cursor-not-allowed bg-red-400"
          }`}
          disabled={selectedProducts?.length > 0}
        >
          {" "}
          <Trash size={20} /> ডিলিট করুন
        </div>
      </DialogTrigger>
      {selectedProducts?.length > 0 && (
        <DialogContent>
          <DialogTitle>সিলেক্টেড প্রোডাক্টস ডিলিট</DialogTitle>
          <DialogDescription>
            আপনি সিলেক্টেড প্রোডাক্টস ডিলিট করতে চান। ডিলিট করতে হলে একটি ছোট
            ভেরিফিকেশন করুন{" "}
            <strong className="bg-primary/20 rounded-sm px-2 text-primary">
              DELETE SELECTED PRODUCTS
            </strong>
            <form onSubmit={handelDeleteAll} className="mt-5">
              <Input
                name="key"
                placeholder="উপরে থাকা কোড টি টাইপ করুন"
                icon={<Key />}
              />
              <button className="mt-10 bg-red-500 px-3 py-2 text-white rounded-sm">
                ডিলিট
              </button>
            </form>
          </DialogDescription>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default DeleteAllSelectedProducts;
