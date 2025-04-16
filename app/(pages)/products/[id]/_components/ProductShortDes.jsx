"use client";

import { set } from "mongoose";
import { useState } from "react";

const ProductShortDes = ({ text }) => {
  const [max, setmax] = useState(false);

  return (
    <>
      <p>
        {text?.slice(0, !max ? 110 : text.length)}
        {!max && text.length > 110 && "...  "}
        <button
          onClick={() => setmax(!max)}
          className={`cursor-pointer font-light ${
            !max ? "text-yellow-500" : "text-blue-600"
          } underline`}
        >
          {" "}
          {max ? "....কম দেখান" : "আরও পড়ুন...."}
        </button>
      </p>
    </>
  );
};

export default ProductShortDes;
