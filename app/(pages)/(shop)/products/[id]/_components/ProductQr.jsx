"use client";

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

const ProductQr = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    const currentUrl = window.location.href;

    const generateQRCode = async () => {
      try {
        const qrCode = await QRCode.toDataURL(currentUrl);
        setQrCodeUrl(qrCode);
      } catch (error) {}
    };

    generateQRCode();
  }, []);

  if (window.undefined) {
    return;
  }

  return (
    <div>
      {qrCodeUrl ? (
        <Image
          className="border"
          width={200}
          height={200}
          src={qrCodeUrl}
          alt="QR Code"
        />
      ) : (
        <Skeleton className={`w-[200px] h-[200px]`} />
      )}
    </div>
  );
};

export default ProductQr;
