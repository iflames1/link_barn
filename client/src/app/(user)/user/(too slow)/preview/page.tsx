import Header from "@/components/header";
import { cookies } from "next/headers";

import type { Metadata } from "next";
import ResponsiveButton from "@/components/common/responsive-button";
import { layouts } from "@/components/appearance/layouts";
import { getUserProfileCached } from "@/lib/caching";
import { revalidateTagServer, revalidateUserProfile } from "@/app/actions";
import { getUserProfile } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Preview",
  description: "Preview your links, see how they look",
};

export default async function PreviewPage() {
  const uuid = cookies().get("uuid")?.value;

  const userProfile = await getUserProfileCached(uuid || "");
  //console.log(userProfile);
  const links = userProfile?.links;
  const layout = userProfile?.appearance
    ? layouts.find((layout) => layout.name === userProfile?.appearance)
    : layouts[0];
  console.log("Star", layout);

  return (
    <div className="sm:p-6 w-full max-w-[1440px] mx-auto">
      <Header />
      <div className="sm:p-0 sm:pt-6 p-4 relative">
        <div className="bg-white rounded-xl sm:sm:h-[calc(100vh-152px)] h-[calc(100vh-96.37px)] overflow-y-auto">
          {layout ? (
            <layout.LayoutComponent userData={userProfile} links={links} />
          ) : (
            <p>We are currently experiencing some issues</p>
          )}
        </div>
        <ResponsiveButton
          path="/user/appearance"
          title="Customize apppearance"
          className="absolute bottom-4 right-4"
        />
      </div>
    </div>
  );
}
