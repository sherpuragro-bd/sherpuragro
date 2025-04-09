import { convertToBengaliNumbers } from "@/lib/utils";

const ProductDetails = ({ data }) => {
  return (
    <>
      <div className="w-full md:w-5/12 space-y-3">
        <h2 className="text-4xl">{data.name}</h2>
        {data?.description && <p className="font-light">{data?.description}</p>}
        <div className="flex gap-2 items-end">
          <span className="text-4xl text-primary">
            {data?.discountPrice
              ? convertToBengaliNumbers(data?.discountPrice)
              : convertToBengaliNumbers(data?.price)}
            ৳
          </span>
          <div className="flex flex-col">
            {data.discountPrice && (
              <>
                {data.discountPrice < data.price && (
                  <span className="text-sm -mb-2 text-yellow-500 font-light">
                    {Math.round(
                      ((data.price - data.discountPrice) / data.price) * 100
                    )}
                    % off
                  </span>
                )}
                <span className="line-through text-xl">
                  {convertToBengaliNumbers(data?.price)}৳
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
