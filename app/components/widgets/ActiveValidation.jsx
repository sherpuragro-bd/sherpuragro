import AccountValidation from "@/app/account/_components/AccountValidation";
import Image from "next/image";
import ValidImage from "../../../public/img/valid.png";

const ActiveValidation = () => {
  return (
    <>
      <AccountValidation />
      <section className="flex justify-center">
        <div className="max-w-primary w-full flex justify-center items-center py-20">
          <div className="max-w-[400px] flex flex-col items-center gap-5 px-5 text-center">
            <Image width={200} src={ValidImage} alt="Accoutn valid" />
            <h2 className="text-4xl">ভেরিফাই একাউন্ট</h2>
            <p>
              দুঃখিত শেরপুর আগ্রো টার্মস এন্ড পলিসি অনুযায়ী কোনো অর্ডার করার
              পূর্বে আপনার একাউন্ট টি ভেরিফায়েড থাকতে হবে, ভেরিফাই করতে উপরে
              থাকা বাটন এ ক্লিক করে ওটিপি পাঠান{" "}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ActiveValidation;
