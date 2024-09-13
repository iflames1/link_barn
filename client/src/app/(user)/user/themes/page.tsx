import Header from "@/components/header";
import Themes from "@/components/themes/themes";
import { getUserProfileCached } from "@/lib/caching";
import { checkTransactionStatus } from "@/lib/checkTransactionStatus";
import { saveUserDetails } from "@/lib/saveUserDetails";
import { UserProfileSchema } from "@/types/users";
import { cookies } from "next/headers";
import { toast } from "sonner";
//import Themes from "./themes";

const checkStatus = async (status: string, user: UserProfileSchema) => {
  if (user) {
    if (status === "success") {
      user.prevTxID = "";
      user.tier = "premium";
      await saveUserDetails(user);
      toast.success("Transaction successful", { richColors: true });
    }
  }
};

const ThemesPage = async ({
  searchParams,
}: {
  searchParams: { theme?: string };
}) => {
  const uuid = cookies().get("uuid")?.value;
  const userProfileDetails = await getUserProfileCached(uuid as string);
  const status = await checkTransactionStatus(userProfileDetails.prevTxID);
  console.log("Status", status);
  const result = await checkStatus(status, userProfileDetails);
  console.log(result);

  return (
    <div className="sm:p-6 w-full max-w-[1440px] mx-auto">
      <Header />
      <div className="w-full sm:p-0 sm:pt-6 p-4">
        <Themes
          userProfileDetails={userProfileDetails}
          selectedTheme={searchParams?.theme || undefined}
          status={status}
        />
        {/*<Appearance />*/}
      </div>
    </div>
  );
};

export default ThemesPage;
