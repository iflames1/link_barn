import Header from "@/components/header";
import { NewLinks } from "@/components/links/new-links-content";
import { getUserProfile } from "@/lib/queries";
import { cookies } from "next/headers";

import type { Metadata } from "next";
import Links from "@/components/links/links";
import { getUserProfileCached } from "@/lib/caching";
// import Links from "@/components/links/links";

export const metadata: Metadata = {
  title: "Links",
  description: "Create | Read | Update | Delete | Reorder your links",
};

export default async function LinksPage() {
  const uuid = cookies().get("uuid")?.value;
  // const userProfile = await getUserProfile(uuid || "");
  const userProfile = await getUserProfileCached(uuid || "");
  const links = userProfile?.links ?? [];
  // console.log(userProfile);

  return (
    <div className="min-h-screen max-h-screen overflow-hidden sm:p-6 w-full max-w-[1440px] mx-auto relative">
      <Header />
      <div className="sm:p-0 sm:pt-6 p-4">
        {/*<NewLinks userProfile={userProfile} defaultLinks={links} />*/}
        <Links />
      </div>
    </div>
  );
}
