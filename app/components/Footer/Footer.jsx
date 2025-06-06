"use client";

import Image from "next/image";
import FooterBanner from "../../../public/img/footerbanner.png";
import SubscribeNewsletter from "../ui/SubscribeNewsletter";
import FooterImage from "../../../public/img/footerImage.png";
import FreeDeliveryIcon from "../../../public/img/fastdelivery.png";
import CustomerSupportIcon from "../../../public/img/customersupport.png";
import SecurePaymentIcon from "../../../public/img/securepayment.png";
import OrderReturnIconm from "../../../public/img/orderreturn.png";
import { LinkHighLight } from "../ui/LinkHighLight";
import { Headset, Mail, MapPin, PhoneCall } from "lucide-react";
import { HeaderData } from "@/data/Header";
import { convertToBengaliNumbers } from "@/lib/utils";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import LogoURI from "../../../public/img/logo.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrAppleAppStore } from "react-icons/gr";

export const FooterFeturesData = [
  {
    icon: FreeDeliveryIcon,
    title: "ফ্রী ডেলিভারি",
    des: "৫০০০ টাকা অধিক অর্ডারে ফ্রী ডেলিভারি",
  },
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

const Footer = () => {
  const [allCategories, setallCategories] = useState([
    {
      href: "#",
      text: "লোড হুসছে....",
    },
  ]);

  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");
    if (!storedCategories) return;

    try {
      const categories = JSON.parse(storedCategories);
      if (!Array.isArray(categories)) return;

      const newMappedCategories = categories.map((category) => ({
        text: category.nameCategory,
        href: `/categories/${category.permalLink}`,
      }));
      setallCategories(newMappedCategories);
    } catch (error) {}
  }, []);

  return (
    <footer className="flex justify-center pb-24 sm:pb-0">
      <div className="max-w-[1440px] w-full px-5">
        <div className="relative w-full rounded-2xl overflow-hidden">
          <Image
            src={FooterBanner}
            alt="Footer Banner"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 z-0"
            priority
          />
          <div className="flex flex-col lg:flex-row items-center p-10 md:p-20 xl:py-10 z-30 relative">
            <div className="w-full lg:w-8/12 space-y-5">
              <div className="w-full lg:w-9/12 space-y-8">
                <h2 className="text-4xl sm:text-5xl z-30">
                  ঘরে বসে আপনার পছন্দের পণ্য অর্ডার করুন
                </h2>
                <p className="font-light">
                  আপনি কোনও ঝামেলা ছাড়াই আপনার নিজের ঘরে বসেই আপনার পছন্দের
                  পণ্যগুলি সহজেই অর্ডার করতে পারেন। বিভিন্ন ধরণের আইটেম অন্বেষণ
                  করুন এবং সেগুলি সরাসরি আপনার দোরগোড়ায় পৌঁছে দিন।
                </p>
              </div>
              <SubscribeNewsletter className="!w-full md:!w-7/12" />
            </div>
            <div className="w-full lg:w-6/12 lg:block hidden">
              <Image alt="Footer Image" src={FooterImage} />
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-10 gap-5">
          {FooterFeturesData.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 md:flex-col lg:flex-row md:text-center lg:text-start bg-slate-100 space-x-3 rounded-xl hover:-translate-y-2 cursor-pointer ease-linear transition-all border p-5"
            >
              <div>
                <Image className="w-[50px]" src={item.icon} alt={item.title} />
              </div>
              <div>
                <h4 className="text-lg">{item.title}</h4>
                <p className="text-sm font-light">{item.des}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full  pt-10 gap-10 flex-wrap">
          <div className="flex-grow basis-52 md:max-w-[300px] space-y-5">
            <Link href="/" className="text-3xl">
              <Image width={180} src={LogoURI} alt="Sherpur Agro Logo" />
            </Link>
            <p className=" text-sm text-text/80">
              আপনি কোনও ঝামেলা ছাড়াই আপনার নিজের ঘরে বসেই আপনার পছন্দের
              পণ্যগুলি সহজেই অর্ডার করতে পারেন।{" "}
            </p>
            <ul className="gap-1 flex flex-col">
              {SiteInfo.map((info, index) => {
                const Wrapper = info.href ? Link : "li";

                return (
                  <Wrapper
                    key={`site-info-${index}`}
                    {...(info.href ? { href: info.href || "#" } : {})}
                    className={`${
                      info.href ? "hover:underline  transition-all" : ""
                    }`}
                  >
                    <info.icon
                      {...info.iconProps}
                      strokeWidth={1.5}
                      size={info?.iconProps?.size || 20}
                      className="text-primary -mb-5"
                    />
                    <div>
                      <strong className="font-medium ml-7">
                        {info.label} :
                      </strong>{" "}
                      <span className="font-light"> {info.text}</span>
                    </div>
                  </Wrapper>
                );
              })}
            </ul>
          </div>
          <FooterInfoTray links={CompanyData} title="কম্পানি" />
          <FooterInfoTray className="md:!max-w-[350px]" title="ক্যাটেগরিস">
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 ">
              {allCategories.map((link, index) => (
                <Link
                  key={`site-links-${Math.random(232)}`}
                  className="text-text/80 flex gap-2 hover:underline"
                  href={link.href}
                >
                  {link.text}
                </Link>
              ))}
            </ul>
          </FooterInfoTray>
          <FooterInfoTray links={CompanyData} title="ইনফর্মেশন" />
          <FooterInfoTray
            des={"অ্যাপ স্টোর বা গুগল প্লে স্টোর থেকে"}
            title="ইন্সটল অ্যাপ"
          >
            <div className="space-y-3 w-fit !font-en">
              <Link
                target="_blank"
                href={`https://www.apple.com/app-store/`}
                className="border items-center gap-3 flex px-3 rounded-xl border-text/20 w-full p-2  text-text"
              >
                <GrAppleAppStore className="text-sky-600" size={40} />
                <div>
                  <p className="text-sm font-medium">Download on the </p>
                  <h3 className="text-xl -mt-2 font-semibold">App Store</h3>
                </div>
              </Link>
              <Link
                target="_blank"
                href={`https://play.google.com/store/apps?hl=en`}
                className="border items-center gap-3 flex rounded-xl border-text/20 w-full p-2  text-text"
              >
                <div className="w-[40px] flex justify-center items-center">
                  <svg
                    height="30px"
                    width="30px"
                    version="1.1"
                    className="ml-2"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 511.999 511.999"
                    xmlSpace="preserve"
                  >
                    <g>
                      <path
                        style={{ fill: "#32BBFF" }}
                        d="M382.369,175.623C322.891,142.356,227.427,88.937,79.355,6.028
		C69.372-0.565,57.886-1.429,47.962,1.93l254.05,254.05L382.369,175.623z"
                      />
                      <path
                        style={{ fill: "#32BBFF" }}
                        d="M47.962,1.93c-1.86,0.63-3.67,1.39-5.401,2.308C31.602,10.166,23.549,21.573,23.549,36v439.96
		c0,14.427,8.052,25.834,19.012,31.761c1.728,0.917,3.537,1.68,5.395,2.314L302.012,255.98L47.962,1.93z"
                      />
                      <path
                        style={{ fill: "#32BBFF" }}
                        d="M302.012,255.98L47.956,510.035c9.927,3.384,21.413,2.586,31.399-4.103
		c143.598-80.41,237.986-133.196,298.152-166.746c1.675-0.941,3.316-1.861,4.938-2.772L302.012,255.98z"
                      />
                    </g>
                    <path
                      style={{ fill: "#2C9FD9" }}
                      d="M23.549,255.98v219.98c0,14.427,8.052,25.834,19.012,31.761c1.728,0.917,3.537,1.68,5.395,2.314
	L302.012,255.98H23.549z"
                    />
                    <path
                      style={{ fill: "#29CC5E" }}
                      d="M79.355,6.028C67.5-1.8,53.52-1.577,42.561,4.239l255.595,255.596l84.212-84.212
	C322.891,142.356,227.427,88.937,79.355,6.028z"
                    />
                    <path
                      style={{ fill: "#D93F21" }}
                      d="M298.158,252.126L42.561,507.721c10.96,5.815,24.939,6.151,36.794-1.789
	c143.598-80.41,237.986-133.196,298.152-166.746c1.675-0.941,3.316-1.861,4.938-2.772L298.158,252.126z"
                    />
                    <path
                      style={{ fill: "#FFD500" }}
                      d="M488.45,255.98c0-12.19-6.151-24.492-18.342-31.314c0,0-22.799-12.721-92.682-51.809l-83.123,83.123
	l83.204,83.205c69.116-38.807,92.6-51.892,92.6-51.892C482.299,280.472,488.45,268.17,488.45,255.98z"
                    />
                    <path
                      style={{ fill: "#FFAA00" }}
                      d="M470.108,287.294c12.191-6.822,18.342-19.124,18.342-31.314H294.303l83.204,83.205
	C446.624,300.379,470.108,287.294,470.108,287.294z"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-medium">GET IT ON</p>
                  <h3 className="text-xl -mt-2 font-semibold">Google Play</h3>
                </div>
              </Link>
            </div>
          </FooterInfoTray>
        </div>
        <div className="flex gap-5 w-full py-5 border-t items-center mt-10 justify-between">
          <p>
            কপিরাইট © {convertToBengaliNumbers(new Date().getFullYear())}{" "}
            <LinkHighLight href="/">শেরপুর এগ্রো</LinkHighLight> সর্বস্বত্ব
            সংরক্ষিত
          </p>
          <div className="max-[570px]:hidden">
            <div className="flex gap-3 items-center">
              <PhoneCall size={30} strokeWidth={1} />
              <div>
                <LinkHighLight
                  href={`tel:${HeaderData.headerPhone.phone}`}
                  className="text-lg"
                >
                  {convertToBengaliNumbers(HeaderData.headerPhone.phone)}
                </LinkHighLight>
                <p className="font-light -mt-2">২৪/৭ কাস্টমার সাপোর্ট</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

export const socialMediaLinks = [
  {
    icon: FaFacebookF,
    name: "Facebook",
    link: "https://www.facebook.com/sherpuragrobd",
  },
  {
    icon: FaWhatsapp,
    name: "Whatsapp",
    link: `https://wa.me/${HeaderData.headerPhone.phone.split(" ").join("")}`,
  },
];

const SiteInfo = [
  {
    label: "ঠিকানা",
    href: "/map",
    icon: MapPin,
    text: "শেরপুর অঞ্চল প্রাচীনকালে কামরূপা রাজ্যের অংশ ছিল",
  },
  {
    label: "মোবাইল",
    href: `tel:${HeaderData.headerPhone.phone}`,
    icon: Headset,
    text: convertToBengaliNumbers(HeaderData.headerPhone.phone),
  },
  {
    label: "ইমেইল",
    href: `mailto:mail.sherpuragrobd@gmail.com`,
    icon: Mail,
    text: "mail.sherpuragrobd@gmail.com",
  },
];

const FooterInfoTray = ({
  className = "",
  title = "",
  des,
  links,
  children,
}) => {
  return (
    <>
      <div
        className={`flex-grow basis-52 md:max-w-[200px] space-y-4 ${className}`}
      >
        <h2 className="text-2xl font-medium">{title}</h2>
        {des && <p className=" text-sm text-text/80">{des}</p>}
        {links && (
          <ul className="flex flex-col gap-2">
            {links.map((link, index) => (
              <Link
                key={`site-links-${Math.random(232)}`}
                className="text-text/80 hover:underline"
                href={link.href}
              >
                {link.text}
              </Link>
            ))}
          </ul>
        )}
        {children}
      </div>
    </>
  );
};

export const CompanyData = [
  {
    href: "",
    text: "আমাদের সম্পর্কে",
  },
  {
    href: "",
    text: "চাকরি",
  },
  {
    href: "",
    text: "যোগাযোগ",
  },
];
