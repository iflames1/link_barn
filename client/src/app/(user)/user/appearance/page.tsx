import Header from "@/components/header";
import Appearance from "@/components/appearance/appearance";
import { getUserProfile } from "@/lib/queries";
import { cookies } from "next/headers";

const AppearancePage = async () => {
  const uuid = cookies().get("uuid")?.value;
  const userProfile = await getUserProfile(uuid as string);

  return (
    <div className="sm:p-6 w-full max-w-[1440px] mx-auto">
      <Header />
      <div className="w-full sm:p-0 sm:pt-6 p-4">
        <Appearance userProfile={userProfile} />
      </div>
    </div>
  );
};

export default AppearancePage;
