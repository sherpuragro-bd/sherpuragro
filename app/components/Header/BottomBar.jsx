import { getServerSession } from "next-auth";
import Bar from "./Bar";
import { getUser } from "@/actions/user";

export default async function BottomBar() {
  const session = await getServerSession();
  const user = await getUser();

  return (
    <>
      <section className="w-full fixed bottom-0 md:hidden z-[999] flex justify-center">
        <div className="w-full px-5 bg-white pt-1">
          <Bar user={{ ...user, _id: `${user?._id}` }} session={session} />
        </div>
      </section>
    </>
  );
}
