"use client";

import { GrSearch } from "react-icons/gr";

export default function Search() {
  return (
    <>
      <form className="w-6/12 hidden md:block">
        <div className="px-5 flex items-center border py-[5px] focus-within:border-primary/50 transition-all rounded-md">
          <input
            type="text"
            placeholder="পণ্য খুজুন"
            className="placeholder:font-extralight bg-transparent py-1 w-full font-extralight"
          />
          <button>
            <GrSearch size={22} />
          </button>
        </div>
        {/* <div className=" bg-white  border-primary/40 rounded-lg h-20 border -mb-20 z-48 translate-y-3 relative"></div> */}
      </form>
    </>
  );
}
