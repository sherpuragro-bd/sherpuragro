"use client";

import { forwardRef, useEffect, useState } from "react";
import { Input } from "@/app/components/ui/Input";
import { isValidPhoneNumber } from "libphonenumber-js";

const NumberInput = forwardRef(
  (
    {
      value: externalValue,
      onChange: externalOnChange,
      error: externalError,
      label = "ফোন নাম্বার",
      placeholder = "+8801XXXXXXXXX",
      className = "!pl-10",
      childrenClass = "!mt-2",
      icon,
      required = true,
      ...restProps
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState("+88");
    const [internalError, setInternalError] = useState("");

    useEffect(() => {
      if (externalValue !== undefined && externalValue !== internalValue) {
        setInternalValue(externalValue);
      }
    }, [externalValue]);

    const validateBDNumber = (num) => {
      if (!num.startsWith("+8801")) return false;
      if (num.length !== 14) return false;
      return isValidPhoneNumber(num, "BD");
    };

    const handleChange = (e) => {
      let val = e.target.value;

      if (!val.startsWith("+88")) {
        val = "+88";
      }

      let rest = val.slice(3);
      rest = rest.replace(/\D/g, "");

      if (rest.length > 0) {
        if (!rest.startsWith("01")) {
          rest = "01";
        }
      } else {
        rest = "";
      }

      if (rest.length > 11) {
        rest = rest.slice(0, 11);
      }

      const formatted = "+88" + rest;
      setInternalValue(formatted);

      if (!validateBDNumber(formatted)) {
        setInternalError("সঠিক ফোন নাম্বার লিখুন, যেমন +8801XXXXXXXXX");
      } else {
        setInternalError("");
      }

      if (typeof externalOnChange === "function") {
        externalOnChange(formatted);
      }
    };

    return (
      <Input
        {...restProps}
        required={required}
        type="tel"
        label={label}
        placeholder={placeholder}
        className={className}
        childrenClass={childrenClass}
        value={internalValue}
        onChange={handleChange}
        ref={ref}
        icon={
          icon ?? (
            <svg
              width={23}
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#006A4D"
                d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v18z"
              />
              <circle fill="#F42A41" cx={16} cy="17.5" r={7} />
            </svg>
          )
        }
      >
        {(externalError || internalError) && (
          <p className="text-sm text-red-500 mt-1">
            {externalError || internalError}
          </p>
        )}
      </Input>
    );
  }
);

NumberInput.displayName = "NumberInput";

export default NumberInput;
