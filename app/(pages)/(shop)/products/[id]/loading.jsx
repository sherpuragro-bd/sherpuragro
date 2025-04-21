"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProductSkeleton() {
  return (
    <section className="flex w-full flex-col items-center justify-center">
      <div className="flex max-w-primary gap-5 px-5 py-10 w-full flex-col lg:flex-row">
        <div className="w-full lg:w-9/12">
          <div className="flex w-full gap-10 flex-col md:flex-row">
            <div className="w-full md:w-5/12">
              <div className="border rounded-2xl overflow-hidden relative">
                <div className="aspect-square w-full">
                  <Skeleton className="w-full h-full" />
                </div>
              </div>

              <div className="w-full flex flex-wrap mt-5 gap-5">
                <div className="w-24 border rounded-2xl overflow-hidden border-primary/50 ring-2 ring-primary/30">
                  <div className="aspect-square w-full">
                    <Skeleton className="w-full h-full" />
                  </div>
                </div>
                <div className="w-24 border rounded-2xl overflow-hidden">
                  <div className="aspect-square w-full">
                    <Skeleton className="w-full h-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-7/12 flex flex-col gap-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-10 w-40 mt-4" />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-3/12 flex flex-col gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-8/12" />
          <Skeleton className="h-32 w-32 rounded-xl" />
        </div>
      </div>
    </section>
  );
}
