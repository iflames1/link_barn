import Header from "@/components/header";
import Preview from "@/components/preview/preview";
import Link from "next/link";
import { getUserProfile } from "@/lib/queries";
import { cookies } from "next/headers";

import type { Metadata } from "next";
import ResponsiveButton from "@/components/common/responsive-button";
import { layouts } from "@/components/appearance/layouts";

export const metadata: Metadata = {
  title: "Preview",
  description: "Preview your links, see how they look",
};

export default async function PreviewPage() {
  const userProfileDetails = await getUserProfile(
    cookies().get("uuid")?.value || "",
  );
  console.log(userProfileDetails, "HMMMMM");
  const links = await userProfileDetails?.links;
  console.log(links, userProfileDetails);
  const layout = layouts.find(
    (layout) => layout.name === "layout3",
    // (layout) => layout.name === userProfileDetails?.appearance || "layout3",
  );
  console.log(layout, "WATASHI WA STAR");

  return (
    <div className="sm:p-6 w-full max-w-[1440px] mx-auto">
      <Header />
      <div className="sm:p-0 sm:pt-6 p-4">
        <div className="bg-white rounded-xl sm:sm:h-[calc(100vh-152px)] h-[calc(100vh-96.37px)] overflow-y-auto sm:p-10 p-6 relative">
          {/* <Preview */}
          {/*   userProfileDetails={userProfileDetails} */}
          {/*   links={userProfileDetails && userProfileDetails.links} */}
          {/* /> */}
          <div className="max-w-[500px] mx-auto">
            {layout && (
              <layout.LayoutComponent
                userData={userProfileDetails}
                links={userProfileDetails.links}
              />
            )}
          </div>
          <ResponsiveButton
            path="/user/appearance"
            title="Customize Appearance"
            className="absolute bottom-0 right-6"
          />
        </div>
      </div>
    </div>
  );
}
