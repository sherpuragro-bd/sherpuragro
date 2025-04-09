import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ArrowRight } from "lucide-react";

const HomeCategorieSkeleton = () => {
  return (
    <>
      <section className="flex justify-center w-full">
        <div className="max-w-primary w-full px-5 py-14">
          <div className="flex justify-between w-full items-center">
            <h2 className="text-3xl">ক্যাটেগরিস</h2>
            <div className="flex items-center gap-5">
              <button className="bg-slate-200 p-2 rounded-full hover:text-white text-slate-500 transition-all hover:bg-primary">
                <ArrowLeft size={20} />
              </button>
              <button className="bg-slate-200 p-2 rounded-full hover:text-white text-slate-500 transition-all hover:bg-primary">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
          <div className="w-full overflow-x-hidden gap-5 flex mt-5 justify-between">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={`category-skeleton-${Math.random(34)}`}
                className="p-5 border flex justify-center items-center flex-col rounded-xl bg-gradient-to-br from-slate-100 to-slate-200"
              >
                <Skeleton className={`w-[70px] h-[60px] rounded-lg`} />
                <Skeleton className={`w-[60px] h-[20px] rounded-sm mt-3`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeCategorieSkeleton;
