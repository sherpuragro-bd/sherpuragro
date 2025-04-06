"use client";

import { useEffect, useState } from "react";
import { Label } from "../ui/Label";
import { X } from "lucide-react";

const TagSelect = ({ label = "ট্যাগ্স", defaultTags = [], onChange }) => {
  const [selectedTags, setSelectedTags] = useState(defaultTags);

  useEffect(() => {
    if (typeof onChange === "function") {
      onChange(selectedTags);
    }
  }, [selectedTags, onChange]);

  const handleNewTags = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value && !selectedTags.includes(value)) {
        setSelectedTags([...selectedTags, value]);
      }
      e.target.value = "";
    }

    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      selectedTags.length > 0
    ) {
      setSelectedTags(selectedTags.slice(0, -1));
    }
  };

  const deleteTag = (indexToRemove) => {
    setSelectedTags(selectedTags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="p-5 border">
      <Label>{label}</Label>
      <div className="p-1 gap-2 flex flex-wrap pb-3">
        {selectedTags.map((tag, index) => (
          <div
            key={index}
            className="bg-primary font-light flex text-white gap-2 overflow-hidden pl-2 rounded-sm"
          >
            {tag}
            <button
              className="bg-white/60 transition-all text-primary hover:text-white hover:bg-red-400 px-1"
              onClick={() => deleteTag(index)}
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
      <div className="border rounded-md">
        <textarea
          type="text"
          maxLength={50}
          onKeyDown={handleNewTags}
          className="p-2 w-full"
          placeholder="ট্যাগ্স সিলেক্ট করুন"
        />
      </div>
    </div>
  );
};

export default TagSelect;
