import Header from "@/components/header";
import Themes from "@/components/themes/themes";
import { getUserProfileCached } from "@/lib/caching";
import { cookies } from "next/headers";
//import Themes from "./themes";

const ThemesPage = async ({
  searchParams,
}: {
  searchParams: { theme?: string };
}) => {
  const uuid = cookies().get("uuid")?.value;
  const userProfileDetails = await getUserProfileCached(uuid as string);

  return (
    <div className="sm:p-6 w-full max-w-[1440px] mx-auto">
      <Header />
      <div className="w-full sm:p-0 sm:pt-6 p-4">
        <Themes
          userProfileDetails={userProfileDetails}
          selectedTheme={searchParams?.theme || undefined}
        />
        {/*<Appearance />*/}
      </div>
    </div>
  );
};

export default ThemesPage;
