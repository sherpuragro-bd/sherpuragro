import { Suspense } from "react";
import Hero from "./components/widgets/Hero";
import HomeCategoriesServer from "./components/widgets/HomeCategoriesServer";
import HomePopularProduct from "./components/widgets/HomePopularProduct";
import HomeCategorieSkeleton from "./components/ui/HomeCategorieSkeleton";

export default function page() {
  return (
    <>
      <Hero />
      <Suspense
        fallback={
          <>
            <HomeCategorieSkeleton />
          </>
        }
      >
        <HomeCategoriesServer />
      </Suspense>
      <HomePopularProduct />
    </>
  );
}
