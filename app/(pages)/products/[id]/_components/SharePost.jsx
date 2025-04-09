"use client";

import { copyToClipboard } from "@/lib/utils";
import { Link2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  FaFacebook,
  FaFacebookF,
  FaRegEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
} from "react-share";

const SharePost = () => {
  const location = window.location.href;

  const defaultClass =
    "border p-2 rounded-md hover:text-primary transition-all";

  return (
    <div className="flex items-center gap-3 mt-2 flex-wrap">
      <FacebookShareButton url={location}>
        <div className={defaultClass}>
          <FaFacebookF />
        </div>
      </FacebookShareButton>
      <WhatsappShareButton url={location}>
        <div className={defaultClass}>
          <FaWhatsapp />
        </div>
      </WhatsappShareButton>
      <EmailShareButton url={location}>
        <div className={defaultClass}>
          <FaRegEnvelope />
        </div>
      </EmailShareButton>
      <button
        onClick={() => {
          copyToClipboard(location);
          toast.success("প্রোডাক্ট লিঙ্ক সফল ভাবে কপি হয়েছে");
        }}
        className={defaultClass}
      >
        <Link2 />
      </button>
    </div>
  );
};

export default SharePost;
