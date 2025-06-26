"use client";

import Select from "react-select";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { districtsData } from "@/public/data/District";
import { upazilasData } from "@/public/data/Upazila";

export default function DistrictAndUpazila({
  setAddress,
  value,
  options,
  defaultValue,
  ...props
}) {
  const customFilter = (option, inputValue) => {
    if (!inputValue) return true;

    const search = inputValue?.toLowerCase();
    return option.value.name?.toLowerCase()?.includes(search);
  };
  return (
    <>
      <Select
        {...props}
        value={value}
        onChange={setAddress}
        filterOption={customFilter}
        options={options}
        noOptionsMessage={() => "কোন অপশন খুঁজে পাওয়া যাইনি"}
      />
    </>
  );
}
