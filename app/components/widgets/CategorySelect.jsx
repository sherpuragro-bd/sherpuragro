"use client";

import { getAllCategories } from "@/actions/admin/Category";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import { Check } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function CategorySelect({ defaultCategories, onChange }) {
  const [allCategories, setallCategories] = useState();
  const [selectedCategory, setselectedCategory] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getAllCategories();
      setallCategories(res);
    })();
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange(selectedCategory);
    }
  }, [selectedCategory]);

  const isMatchCategory = (name, permalLink) => {
    return selectedCategory.some(
      (category) => category.permalLink === permalLink
    );
  };

  const SelectCategoryNew = (name, permalLink) => {
    if (isMatchCategory(name, permalLink)) {
      const removedCategory = selectedCategory.filter(
        (category, index) => category.permalLink !== permalLink
      );
      setselectedCategory(removedCategory);
      return;
    }
    setselectedCategory([...selectedCategory, { name, permalLink }]);
  };

  return (
    <div className="border p-5">
      <Command className="!text-text">
        <CommandInput placeholder="ক্যাটেগরি সিলেক্ট করুন" />
        <CommandList>
          {allCategories && (
            <CommandEmpty>কোন ক্যাটেগরি খুঁজে পাওয়া যাইনি </CommandEmpty>
          )}
          <CommandGroup className="py-3">
            {allCategories ? (
              <>
                {allCategories.map((category, index) => (
                  <CommandItem key={`category-select-${index}`}>
                    <button
                      type="button"
                      onClick={() =>
                        SelectCategoryNew(
                          category.nameCategory,
                          category.permalLink
                        )
                      }
                      className="flex w-full justify-between items-center"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          width={20}
                          height={20}
                          src={category.categoryIconImage}
                          alt={category.nameCategory}
                        />
                        {category.nameCategory}
                      </div>
                      {isMatchCategory(
                        category.nameCategory,
                        category.permalLink
                      ) ? (
                        <span className="h-3 scale-90 justify-center items-center w-3 border border-primary bg-gradient-to-br from-primary to-primary/50 text-white rounded-sm p-2 flex">
                          <Check />
                        </span>
                      ) : (
                        <span className="h-3 scale-90 justify-center items-center w-3 border border-primary  text-white rounded-sm p-2 flex"></span>
                      )}
                    </button>
                  </CommandItem>
                ))}
              </>
            ) : (
              Array.from({ length: 9 }).map((_, index) => (
                <Skeleton
                  key={`category-skeleton-${index}`}
                  className={`w-full my-2 h-[20px]`}
                />
              ))
            )}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
