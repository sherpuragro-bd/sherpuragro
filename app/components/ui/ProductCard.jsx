import { AspectRatio } from "@/components/ui/aspect-ratio";
import { convertToBengaliNumbers } from "@/lib/utils";
import { Eye, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className="border col-span-1 transition-all overflow-hidden cursor-pointer rounded-xl hover:border-primary/60 h-full flex flex-col">
      <Link
        className="group relative flex justify-center items-center"
        href={`/products/${product._doc.permalLink}`}
      >
        <div className="absolute opacity-0 group-hover:opacity-100 transition-all z-50 bg-white backdrop-blur-lg border border-primary/60 rounded-md flex">
          <button className="p-2 border-r hover:text-yellow-400 hover:-translate-y-1 transition-all text-primary">
            <Eye className="transition-all" strokeWidth={1} size={20} />
          </button>
          <button className="p-2 hover:text-yellow-400 hover:-translate-y-1 transition-all text-primary">
            <ShoppingBasket
              className="transition-all"
              strokeWidth={1}
              size={20}
            />
          </button>
        </div>
        <AspectRatio ratio={3 / 3} className="relative w-full">
          <Image
            className="absolute inset-0 w-full h-full transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0 object-cover"
            width={300}
            height={300}
            src={product._doc.images[0]}
            alt={product._doc.name}
          />
          <Image
            className="absolute inset-0 w-full h-full transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 object-cover"
            width={300}
            height={300}
            src={product._doc.images[1] || product._doc.images[0]}
            alt={product._doc.name}
          />
        </AspectRatio>
      </Link>

      <div className="p-5 flex flex-col gap-2 h-full">
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            {product._doc.categories &&
              product._doc.categories.slice(0, 3).map((category) => (
                <Link
                  className="text-sm cursor-pointer hover:text-primary hover:underline text-neutral-400"
                  key={category.permalLink}
                  href={`/categories/${category.permalLink}`}
                >
                  {category.name}
                </Link>
              ))}
          </div>
          <Link href={`/products/${product._doc.permalLink}`}>
            <h2 className="hover:text-primary transition-all">
              {product._doc.name.slice(0, 100)}
              {product._doc.name?.length > 100 && "..."}
            </h2>
          </Link>
        </div>
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex flex-col gap-0">
            <span className="text-xl text-primary">
              {convertToBengaliNumbers(
                product._doc.discountPrice || product._doc.price
              )}{" "}
              ৳
            </span>
            {product._doc.discountPrice && (
              <span className="text-neutral-500 line-through font-extralight -mt-1">
                {convertToBengaliNumbers(product._doc.price)} ৳
              </span>
            )}
          </div>
          <button className="bg-primary/10 flex items-center gap-2 border border-primary/10 text-primary font-light rounded-md px-4 py-2 text-sm transition-all hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-1">
            <ShoppingBasket strokeWidth={1} size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
