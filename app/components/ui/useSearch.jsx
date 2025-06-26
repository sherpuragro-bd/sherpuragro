import { useState } from "react";

export function useSearch(initial = "") {
  const [searchTerm, setSearchTerm] = useState(initial);

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return {
    searchTerm,
    setSearchTerm,
    onSearchChange,
  };
}
