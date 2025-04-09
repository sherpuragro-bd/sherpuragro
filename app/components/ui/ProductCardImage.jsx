import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

const ProductCardImage = ({ product }) => {
  return (
    <>
      <AspectRatio ratio={3 / 3} className="relative w-full">
        <div className="inset-0 z-10 relative">hi</div>
        <Image
          className="absolute inset-0 w-full h-full transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0 object-cover"
          width={300}
          height={300}
          src={product._doc.images[0]}
          alt={product._doc.name}
        />
        <Image
          className="absolute inset-0 w-full h-full transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 object-cover"
          width={300}
          height={300}
          src={product._doc.images[1] || product._doc.images[0]}
          alt={product._doc.name}
        />
      </AspectRatio>
    </>
  );
};

export default ProductCardImage;
