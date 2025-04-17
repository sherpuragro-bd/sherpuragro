"use client";

import { searchProducts } from "@/actions/frontend/productAction";
import { Skeleton } from "@/components/ui/skeleton";
import { convertToBengaliNumbers } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GrSearch } from "react-icons/gr";

export default function Search() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const router = useRouter();

  // Debounce effect
  useEffect(() => {
    if (!search) {
      setIsSearching(false);
      return;
    }

    const delayDebounce = setTimeout(() => {
      setDebouncedSearch(search);
    }, 200); // Wait 500ms after typing ends

    return () => clearTimeout(delayDebounce);
  }, [search]);

  // Fetch products when debouncedSearch changes
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedSearch.length === 0) return;
      setIsFetching(true);
      setIsSearching(true);
      const products = await searchProducts(debouncedSearch);
      setFilteredProducts(products || []);
      setIsFetching(false);
    };

    fetchSearchResults();
  }, [debouncedSearch]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/products?query=${search}`);
      }}
      className="w-6/12 hidden md:block"
    >
      <div className="relative">
        <div className="px-5 flex items-center border py-[5px] focus-within:border-primary/50 transition-all rounded-md">
          <input
            type="text"
            placeholder="পণ্য খুজুন"
            onChange={(e) => setSearch(e.target.value)}
            className="placeholder:font-extralight bg-transparent py-1 w-full font-extralight"
          />
          <Link href={`/products?query=${search}`}>
            <GrSearch size={22} />
          </Link>
        </div>

        <AnimatePresence>
          {isSearching && (
            <motion.div
              animate={{ translateY: 8, opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              className="absolute flex flex-col gap-2 top-full left-0 w-full bg-white drop-shadow-xl p-2 rounded-lg border z-50"
            >
              {filteredProducts.length > 0 ? (
                <>
                  {filteredProducts.map((product) => (
                    <Link
                      href={`/product/${product.permalLink}`}
                      key={product._id}
                      className="flex gap-3"
                    >
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={56}
                        height={56}
                        className="rounded-md"
                      />
                      <div>
                        <h2>{product.name}</h2>
                        <div>
                          <span className="text-lg text-primary">
                            {convertToBengaliNumbers(
                              product.discountPrice || product.price
                            )}{" "}
                            ৳
                          </span>
                          {product.discountPrice && (
                            <span className="text-sm line-through text-gray-400 ml-2">
                              {convertToBengaliNumbers(product.price)} ৳
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </>
              ) : (
                !isFetching && (
                  <p className="font-light my-5 text-center w-full">
                    দুঃখিত আপনার সার্চ করা প্রোডাক্ট টি খুঁজে পাওয়া যাই নি
                  </p>
                )
              )}
              {isFetching && (
                <div className="flex gap-3">
                  <Skeleton className="h-14 w-14" />
                  <div className="flex-grow">
                    <Skeleton className="h-5 w-7/12" />
                    <div className="space-y-1 mt-2">
                      <Skeleton className="h-3 w-9/12" />
                      <Skeleton className="h-3 w-5/12" />
                    </div>
                  </div>
                </div>
              )}
              {filteredProducts.length > 0 && (
                <Link
                  href={`/products?query=${search}`}
                  className="text-center"
                >
                  <button className="bg-primary ring-4 ring-primary/20 font-extralight text-white py-1 rounded-md mt-2 w-full">
                    সকল সার্চ ক্রিত পণ্য দেখুন
                  </button>
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
