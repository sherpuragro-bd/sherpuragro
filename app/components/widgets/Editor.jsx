"use client";
import React, { useEffect, useState } from "react";
import JoditEditor from "jodit-react";

export default function Editor({ content, placeholder = "", setContent }) {
  const [capturedContent, setCapturedContent] = useState(content || "");
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const handleContentChange = (newContent) => {
    setCapturedContent(newContent); // Update local state
    if (setContent) {
      setContent(newContent); // Update parent state if available
    }
  };

  return (
    <>
      {editorLoaded ? (
        <JoditEditor
          value={capturedContent} // Bind to local state
          onBlur={handleContentChange} // Pass content change to state
          config={{
            placeholder: placeholder,
            theme: "default",
            readonly: false,
            height: 550,
          }}
        />
      ) : (
        <div className="w-full h-[400px] bg-gray-200 animate-pulse rounded-md" />
      )}
    </>
  );
}
