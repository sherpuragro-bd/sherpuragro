import { getProductDetails } from "@/actions/frontend/productAction";
import ProductPreview from "./_components/ProductPreview";
import NotFound from "@/app/not-found";
import ProductDetails from "./_components/ProductDetails";

export async function generateMetadata({ params }) {
  const product = await getProductDetails(params.id);
  if (!product) return {};

  return {
    title: product.seoTitle || product.name,
    description: product.seoDes || product.description,
    keywords: product.tags?.join(", ") || "শেরপুর এগ্রো",
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
    alternates: {
      canonical: `/products/${product.permalLink}`,
    },
    openGraph: {
      title: product.seoTitle || product.name,
      description: product.seoDes || product.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${product.permalLink}`,
      siteName: "শেরপুর এগ্রো",
      images: [
        {
          url: product.seoImage || product.images?.[0],
          width: 800,
          height: 600,
        },
      ],
      locale: "bn_BD",
      type: "website", // ✅ FIXED
    },
    twitter: {
      card: "summary_large_image",
      title: product.seoTitle || product.name,
      description: product.seoDes || product.description,
      images: [product.seoImage || product.images?.[0]],
      creator: "@your_twitter_handle",
    },
    robots: "index, follow",
    authors: [{ name: "শেরপুর এগ্রো", url: process.env.NEXT_PUBLIC_SITE_URL }],
    creator: "শেরপুর এগ্রো",
    category:
      product.categories?.map((c) => c.name).join(", ") || "শেরপুর এগ্রো",
  };
}

const ProductDetailsPage = async ({ params }) => {
  const { id } = params;
  const productDetails = await getProductDetails(id);

  if (!productDetails) {
    return <NotFound />;
  }
  const { images, name } = productDetails;
  return (
    <>
      <section className="flex justify-center">
        <div className="flex max-w-primary px-5 py-10 w-full flex-col md:flex-row">
          <div className="flex w-full md:w-9/12 gap-10">
            <ProductPreview title={name} images={images} />
            <ProductDetails data={productDetails} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailsPage;
