import { getAccountData } from "@/actions/frontend/account";
import DeleteAccount from "./_components/DeleteAccount";

const SettingPage = async () => {
  const userData = await getAccountData();

  return (
    <>
      <DeleteAccount />
    </>
  );
};

export default SettingPage;
