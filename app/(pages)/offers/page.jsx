import Image from "next/image";
import GiftImage from "../../../public/img/giftbig.png";
import OfferCardServer from "./OfferCardServer";

const page = () => {
  return (
    <>
      <section className="flex justify-center">
        <div className=" w-full  flex-col items-center flex  justify-center bg-red-100/80 ">
          <div className="max-w-primary w-full gap-3 py-10 flex justify-between px-5">
            <div className="flex flex-col gap-3 z-20">
              <h2 className="text-5xl bg-gradient-to-br gap-5 flex from-red-600 to-red-400  items-center w-fit bg-clip-text text-transparent">
                অফারস
                <Image
                  alt="Gift Image"
                  width={50}
                  height={50}
                  src={GiftImage}
                />
              </h2>
              <p className="max-w-[500px] font-light text-text  text-base leading-5">
                এক্সপ্লোর করুন এবং অর্ডার করুন আমাদের অসাধারুন সকল প্রোডাক্টস
                সাথে ফ্রি শিপিং অথবা ডিসকাউন্ট{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex justify-center pb-10">
        <div className="max-w-primary w-full gap-5 px-5 py-10 grid grid-cols-12">
          <OfferCardServer />
        </div>
      </section>
    </>
  );
};

export default page;
