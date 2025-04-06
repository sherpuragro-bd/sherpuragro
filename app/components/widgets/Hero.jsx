import { Suspense } from "react";
import HeroCategories from "./HeroCategories";
import HomeSliderServer from "./HomeSliderServer";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <>
      <section className="flex justify-center w-full md:mt-7">
        <div className="max-w-primary w-full flex gap-5 md:px-5 justify-between">
          <HeroCategories />
          <div className="min-[1008px]:w-[83%] flex m-0 overflow-hidden w-full border border-t-0 md:border-t md:rounded-2xl">
            <Suspense
              fallback={
                <>
                  <div className="flex flex-col gap-10 min-h-[432px] justify-center w-full bg-gradient-to-br p-10 md:p-20 from-gray-200 to-gray-300">
                    <Skeleton className={`w-8/12 md:w-6/12 h-14`} />
                    <div className="flex flex-col gap-3">
                      <Skeleton className={`w-10/12 md:w-5/12 h-5`} />
                      <Skeleton className={`w-12/12 md:w-7/12 h-5`} />
                      <Skeleton className={`w-7/12 md:w-4/12 h-5`} />
                    </div>
                    <Skeleton className={`w-40 h-12`} />
                  </div>
                </>
              }
            >
              <HomeSliderServer />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
