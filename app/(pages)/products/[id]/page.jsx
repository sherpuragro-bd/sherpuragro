import { getProductDetails } from "@/actions/frontend/productAction";
import ProductPreview from "./_components/ProductPreview";
import NotFound from "@/app/not-found";
import ProductDetails from "./_components/ProductDetails";
import CustomerSupportIcon from "../../../../public/img/customersupport.png";
import SecurePaymentIcon from "../../../../public/img/securepayment.png";
import OrderReturnIconm from "../../../../public/img/orderreturn.png";
import Image from "next/image";
import { Label } from "@/app/components/ui/Label";
import SharePost from "./_components/SharePost";
import ProductQr from "./_components/ProductQr";

export const FeturesData = [
  {
    icon: CustomerSupportIcon,
    title: "কাস্টমার সাপোর্ট",
    des: "২৪/৭ কাস্টমার সাপোর্ট সেবা",
  },
  {
    icon: SecurePaymentIcon,
    title: "নিরাপদ পেমেন্ট",
    des: " SSLCOMMERZ নিরাপদ পেমেন্ট",
  },
  {
    icon: OrderReturnIconm,
    title: "অর্ডার রিটার্ন ",
    des: "৭ দিনের মধ্যে প্রোডাক্ট রিটার্ন সুবিধা",
  },
];

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
      <section className="flex w-full flex-col items-center justify-center">
        <div className="flex max-w-primary gap-5 px-5 py-10 w-full flex-col lg:flex-row">
          <div className="w-full lg:w-9/12">
            <div className="flex w-full gap-10 flex-col md:flex-row  ">
              <ProductPreview title={name} images={images} />
              <ProductDetails data={productDetails} />
            </div>
            {productDetails.content && (
              <div className="border rounded-2xl mt-10 p-5">
                <h2 className="text-2xl">ডেসক্রিপশন </h2>
                <span className="flex w-full h-[1px] bg-border my-3 mb-5" />
                <p
                  className="jodit-workplace"
                  dangerouslySetInnerHTML={{
                    __html: productDetails.content,
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-5 w-full lg:w-3/12 rounded-2xl">
            <ul className="space-y-3 w-full">
              {FeturesData.map((fetures, index) => (
                <li
                  className="flex gap-5 bg-opacity-10 rounded-md cursor-pointer w-full p-2 border items-center"
                  key={`product-fetures-${index}`}
                >
                  <Image
                    width={30}
                    height={30}
                    alt={fetures.title}
                    src={fetures.icon}
                  />
                  <div>
                    <h4>{fetures.title}</h4>
                  </div>
                </li>
              ))}
            </ul>
            <div>
              <Label>প্রোডাক্ট শেয়ার করুন</Label>
              <>
                <SharePost />
              </>
            </div>
            <ProductQr />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailsPage;
