import { useState } from "react";
import Image from "next/image";
import { Loader2, Trash, Upload } from "lucide-react";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";
import { Label } from "../ui/Label";
import { uploadImage as uploadImageCloud } from "@/lib/upload";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const uploadImage = async (file, folder) => {
  const { url } = await uploadImageCloud(file, folder);
  return { url };
};

const ArrImageUpload = ({
  onUpload,
  label,
  required,
  compressOption,
  htmlFor,
  defaultImages = [],
  className,
  disabled = false,
  folder = "default",
  ...props
}) => {
  const [images, setImages] = useState(defaultImages);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setIsUploading(true);
    try {
      const uploadedImages = await Promise.all(
        files.map(async (file) => {
          const options = {
            maxSizeMB: 2,
            maxWidthOrHeight: 800,
            useWebWorker: true,
            ...compressOption,
          };
          const compressedFile = await imageCompression(file, options);
          const { url } = await uploadImage(compressedFile, folder);
          return url;
        })
      );

      setImages((prev) => [...prev, ...uploadedImages]);
      if (onUpload) {
        onUpload([...images, ...uploadedImages]);
      }
      toast.success("Images uploaded successfully!");
    } catch (error) {
      toast.error("Upload failed!");
    }
    setIsUploading(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    if (onUpload) {
      onUpload(updatedImages);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedImages = [...images];
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);
    setImages(reorderedImages);
    if (onUpload) {
      onUpload(reorderedImages);
    }
  };

  return (
    <div className="flex gap-2 p-5 border">
      <input
        disabled={disabled}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        id={htmlFor}
        multiple
        onChange={handleImageUpload}
      />
      {label && <Label required={required || false}>{label}</Label>}
      <label
        {...props}
        htmlFor={htmlFor}
        className={`relative flex flex-col items-center cursor-pointer border-2 border-dashed border-gray-300 p-3 ${
          disabled && "!cursor-not-allowed"
        } rounded-lg w-40 ${className || ""}`}
      >
        {isUploading ? (
          <Loader2 size={50} strokeWidth={1} className="animate-spin my-5" />
        ) : (
          <span className="text-gray-500 flex justify-center items-center flex-col gap-2 py-5">
            <Upload />
            আপলোড করুন
          </span>
        )}
      </label>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="imageList" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex gap-2 flex-wrap"
            >
              {images.map((img, index) => (
                <Draggable key={img} draggableId={img} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="relative w-32 h-32 cursor-grab"
                    >
                      <Image
                        fill
                        src={img}
                        alt="Uploaded Preview"
                        className="object-cover rounded-lg"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-0 right-0 bg-white rounded-full p-1 shadow"
                      >
                        <Trash size={16} className="text-red-500" />
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ArrImageUpload;
