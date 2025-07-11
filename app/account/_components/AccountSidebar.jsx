"use client";

import {
  House,
  Loader2,
  LogOut,
  MapPin,
  Settings,
  ShoppingBasket,
} from "lucide-react";
import { SidebarLinks } from "./SidebarLink";
import { logoutUser } from "@/actions/auth/login";
import { useContext } from "react";
import { AppContext } from "@/app/context/AppContext";

export default function AccountSidebar() {
  const { isLoggingOut, setLoggingOut } = useContext(AppContext);

  return (
    <ul className="flex flex-col gap-3">
      {SideBarLinksData.map((link, index) => (
        <SidebarLinks
          icon={link.icon}
          link={link?.path}
          end={"new"}
          key={index}
          href={`${link.path}`}
        >
          {link.pathName}
        </SidebarLinks>
      ))}
      <button
        disabled={isLoggingOut}
        onClick={async () => {
          setLoggingOut(true);
          await logoutUser();
        }}
        className="px-5 py-3 flex items-center border rounded-lg gap-2 transition-all"
      >
        <span className="scale-90">
          {isLoggingOut ? (
            <Loader2 strokeWidth={1} className="animate-spin" />
          ) : (
            <LogOut strokeWidth={1} className="rotate-180" />
          )}
        </span>
        লগআউট
      </button>
    </ul>
  );
}

const SideBarLinksData = [
  {
    path: "/account",
    pathName: "ওভারভিউ ",
    icon: <House strokeWidth={1} />,
  },
  {
    path: "/account/orders",
    pathName: "অর্ডারস",
    icon: <ShoppingBasket strokeWidth={1} />,
  },
  {
    path: "/account/addresses",
    pathName: "সকল ঠিকানা",
    icon: <MapPin strokeWidth={1} />,
  },
  {
    path: "/account/settings",
    pathName: "অ্যাকাউন্ট সেটিংস ",
    icon: <Settings strokeWidth={1} />,
  },
];
