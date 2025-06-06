import AdminPageHeader from "@/app/components/ui/AdminPageHeader";
import { TicketPercent } from "lucide-react";
import NewOfferCreate from "../_components/NewOfferCreate";

const OffersPageAdmin = () => {
  return (
    <>
      <AdminPageHeader title={"অফারস"} icon={{ icon: TicketPercent }}>
        <NewOfferCreate />
      </AdminPageHeader>
    </>
  );
};

export default OffersPageAdmin;
