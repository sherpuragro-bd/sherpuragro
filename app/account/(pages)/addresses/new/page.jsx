import { getAddressCount } from "@/actions/frontend/productAction";
import AddressNew from "@/app/account/_components/Addressnew";
import NotFound from "@/app/not-found";

export const metadata = {
  title: "নতুন ঠিকানা যুক্ত করুন",
};

export default async function GeolocationComponent() {
  const addressCount = await getAddressCount();
  // prettier-ignore
  if (addressCount >= 3) {
    return <NotFound />;
  }

  return (
    <div className="w-full">
      <AddressNew />
    </div>
  );
}
