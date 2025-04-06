import { Suspense } from "react";
import PopularProducts from "./PopularProducts";
import ProductCardFallback from "../ui/ProductCardFallback";

const HomePopularProduct = () => {
  return (
    <section className="flex justify-center">
      <div className="max-w-primary px-5 w-full pb-10">
        <div className="w-full text-start flex justify-start">
          <h2 className="text-3xl">জনপ্রিয় প্রোডাক্টস</h2>
        </div>
        <div className="w-full grid grid-cols-1 min-[350px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 pt-5">
          <Suspense fallback={<ProductCardFallback />}>
            <PopularProducts />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default HomePopularProduct;
