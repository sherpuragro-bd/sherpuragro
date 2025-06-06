"use client";

import { AdminContext } from "@/app/context/AdminContext";
import CheckBox from "@/components/ui/CheckBox";
import { useContext, useEffect } from "react";

const BulkDelete = ({ id }) => {
  useEffect(() => {
    setselectedProducts([]);
  }, []);

  const { setselectedProducts, selectedProducts } = useContext(AdminContext);

  const isTicked = selectedProducts?.includes(id);

  const handleClick = () => {
    if (selectedProducts?.includes(id)) {
      setselectedProducts((prev) => prev.filter((p) => p !== id));
    } else {
      setselectedProducts((prev) => [...prev, id]);
    }
  };
  return (
    <button onClick={handleClick}>
      <CheckBox ticked={isTicked} />
    </button>
  );
};

export default BulkDelete;
