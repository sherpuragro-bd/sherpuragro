import { getUser } from "@/actions/user";
import { getServerSession } from "next-auth";
import Checkout from "./checkout";

export const metadata = {
  title: "চেকআউট । শেরপুর এগ্রো ",
};

const CheckoutPage = async () => {
  const [session, user] = await Promise.all([getServerSession(), getUser()]);

  return (
    <Checkout
      user={user ? { isActive: user?.isActive, email: user?.email } : false}
      session={session ? true : false}
    />
  );
};

export default CheckoutPage;
