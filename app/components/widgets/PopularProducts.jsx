import { getAllPopularProducts } from "@/actions/admin/Product";

import ProductCard from "../ui/ProductCard";

const PopularProducts = async () => {
  const products = await getAllPopularProducts();
  return (
    <>
      {products &&
        products.map((product, index) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </>
  );
};

export default PopularProducts;
