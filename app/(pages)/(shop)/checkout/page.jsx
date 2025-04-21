import { getUser } from "@/actions/user";
import { getServerSession } from "next-auth";
import Checkout from "./checkout";

const CheckoutPage = async () => {
  const session = await getServerSession();
  const user = await getUser();

  return <Checkout user={user} session={session} />;
};

export default CheckoutPage;
