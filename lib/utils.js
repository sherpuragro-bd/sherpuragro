import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  BookOpenText,
  Folder,
  GalleryVertical,
  Layers,
  LayoutGrid,
  Mail,
  Package2,
  PackageOpen,
  Settings2,
  Store,
  TicketPercent,
  Users,
} from "lucide-react";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const guideStyleOption = {
  options: { zIndex: 999999 },
  tooltip: {
    boxShadow: "none",
    borderRadius: "10px",
    border: "1px solid #0eb77e52",
  },
  buttonNext: {
    background: "#0eb77e",
  },
  buttonBack: {
    color: "#253d4e",
  },
  spotlight: {
    borderRadius: "10px",
    border: "1px solid #0eb77e52",
  },
};

export const adminNavData = {
  navMain: [
    {
      title: "ড্যাশবোর্ড",
      icon: LayoutGrid,
      activePathName: "/admin",
      url: "/",
    },
    {
      title: "হোম স্লাইডার ",
      icon: GalleryVertical,
      activePathName: "/admin/sliders",
      url: "/sliders",
    },
    {
      title: "দোকান",
      icon: Store,
      url: "#",
      items: [
        {
          title: "প্রোডাক্টস ক্যাটাগরি",
          icon: PackageOpen,
          url: "shop/categories",
        },
        {
          title: "প্রোডাক্টস",
          icon: Package2,
          url: "shop/products",
        },
        {
          title: "কুপনস",
          icon: TicketPercent,
          url: "shop/products/coupon",
        },
      ],
    },
    {
      title: "ইউসারস",
      icon: Users,
      url: "/users",
    },
    {
      title: "ব্লগস",
      icon: BookOpenText,
      url: "/blogs",
    },
    {
      title: "পেজেস",
      icon: Layers,
      url: "/pages",
    },
    {
      title: "কন্টাক্টস",
      icon: Mail,
      url: "/contacts",
    },
    {
      title: "মিডিয়া",
      icon: Folder,
      url: "/media",
    },
    {
      title: "সেটিং",
      icon: Settings2,
      url: "/settings",
    },
  ],
};

export const convertToBengaliNumbers = (number) => {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return number.toString().replace(/\d/g, (digit) => bengaliDigits[digit]);
};

export function rgbaToHexWithAlpha({ r, g, b, a }) {
  const alpha = Math.round(a * 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b)
    .toString(16)
    .slice(1)}${alpha.toString(16).padStart(2, "0")}`;
}

export const errorHandeler = (errmore) => {
  return { success: false, err: "অনাখাঙ্কিত সমস্যা", ...errmore };
};

export const replaceMongoIdInArray = (array, remove) => {
  const mappedArray = array
    .map((item) => {
      return {
        _id: item._id.toString(),
        ...item,
        ...remove,
      };
    })
    .map(({ _id, ...rest }) => rest);

  return mappedArray;
};

export const convertMongoIdsInArray = (array) => {
  if (!Array.isArray(array)) return [];

  return array.map(({ _id, ...rest }) => ({
    _id: _id?.toString?.() || "",
    ...rest,
  }));
};

export function copyToClipboard(text) {
  if (!navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    navigator.clipboard.writeText(text);
  }
}

export function generateWhatsAppLink({
  phoneNumber,
  productName,
  quantity,
  price,
  productURL,
  customMsg,
}) {
  // prettier-ignore
  const message = 
  `
    ${customMsg ? (
      customMsg
    ) : (
      `*প্রোডাক্টের নাম* : ${productName} - *পরিমাণ* : ${convertToBengaliNumbers(quantity)} টি - *মূল্য* : ${convertToBengaliNumbers(price)} টাকা - ${productURL} - শেরপুর এগ্রো থেকে এই প্রোডাক্ট টি কিনতে চাই  
      `
    )}
  `.trim();

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
