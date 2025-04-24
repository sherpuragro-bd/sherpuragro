import { Package2 } from "lucide-react";
import Link from "next/link";
import ProductDataTableSSR from "./_components/ProductDataTableSSR";
import DeleteAllSelectedProducts from "./_components/DeleteAllSelectedProducts";

const Products = () => {
  return (
    <>
      <div className="w-full border">
        <div className="flex px-5 py-2 items-center justify-between w-full">
          <h2 className="text-2xl flex items-center gap-3">
            <Package2
              strokeWidth={1.6}
              size={40}
              className="p-2 bg-primary/10 border rounded-md"
            />
            প্রোডাক্টস
          </h2>
          <div className="flex gap-3">
            <DeleteAllSelectedProducts />
            <Link
              href={"/admin/shop/products/create"}
              className="px-5 py-2 rounded-md text-white bg-primary"
            >
              অ্যাড নিউ
            </Link>
          </div>
        </div>
      </div>
      <ProductDataTableSSR />
    </>
  );
};

export default Products;
