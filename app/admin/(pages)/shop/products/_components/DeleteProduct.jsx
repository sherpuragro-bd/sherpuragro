"use client";

import { deleteProduct } from "@/actions/admin/Product";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const DeleteProduct = ({ id }) => {
  const router = useRouter();

  const handelDelete = async () => {
    Swal.fire({
      icon: "question",
      title: "ডিলিট প্রোডাক্ট",
      text: "আপনি কি এই প্রোডাক্ট টি ডিলিট করত চান?",
      showCancelButton: true,
      cancelButtonText: "না",
      confirmButtonText: "ডিলিট",
    }).then(async (res) => {
      if (res.isConfirmed) {
        const res = await deleteProduct(id);
        toast.success(res.msg);
        router.refresh();
      }
    });
  };

  return (
    <>
      <button
        onClick={handelDelete}
        className="text-white bg-gradient-to-r flex w-fit p-1 rounded-md from-red-500 to-red-500/60 border border-red-500 hover:underline"
      >
        <Trash size={20} />
      </button>
    </>
  );
};

export default DeleteProduct;
