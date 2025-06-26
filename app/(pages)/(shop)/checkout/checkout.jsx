"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ActiveValidation from "@/app/components/widgets/ActiveValidation";
import Loader from "./loading";
import CheckoutProcess from "./CheckoutProcess";
import ExitWarning from "@/app/components/widgets/ExitAlert";

const Checkout = ({ user, session }) => {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!session) {
      setShowLoader(true);
      router.push("/login?redirect=checkout");
    } else if (!user) {
      setShowLoader(true);
      router.push("/account?redirect=checkout");
    }
  }, [session, user, router]);

  if (user && !user.isActive) {
    return <ActiveValidation />;
  }

  if (user && user.isActive) {
    return (
      <>
        <CheckoutProcess user={user} />;
      </>
    );
  }

  return <>{showLoader && <Loader />}</>;
};

export default Checkout;
