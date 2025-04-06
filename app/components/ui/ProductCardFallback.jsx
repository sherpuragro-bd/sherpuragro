import { Skeleton } from "@/components/ui/skeleton";

const ProductCardFallback = () => {
  return Array.from({ length: 5 }).map((_, index) => (
    <div
      key={`product-skeleton-${index}`}
      className="border col-span-1 transition-all overflow-hidden cursor-pointer rounded-xl h-full flex flex-col"
    >
      <div className="relative flex justify-center items-center">
        <div className="relative w-full aspect-square">
          <Skeleton className="absolute inset-0 w-full h-full" />
        </div>
      </div>

      <div className="p-5 flex flex-col gap-2 h-full">
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-10" />
          </div>
          <Skeleton className="h-6 w-3/4 mt-2" />
        </div>
        <div className="flex items-center justify-between flex-wrap mt-4">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-10 w-28 rounded-md" />
        </div>
      </div>
    </div>
  ));
};

export default ProductCardFallback;
