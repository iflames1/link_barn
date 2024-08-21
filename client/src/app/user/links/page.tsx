import Header from "@/components/header";
import Links from "@/components/links/links";
import { NewLinks } from "@/components/links/new-links-content";
import { getUserProfile } from "@/lib/queries";
import { cookies } from "next/headers";

export default async function LinksPage() {
  const uuid = cookies().get("uuid")?.value;
  const userProfile = await getUserProfile(uuid || "");
  const links = userProfile?.links ?? [];
  console.log(userProfile);

  return (
    <div className="min-h-screen max-h-screen overflow-hidden sm:p-6 w-full max-w-[1440px] mx-auto relative">
      <Header />
      <div className="sm:p-0 sm:pt-6 p-4">
        <Links />
        {/*<NewLinks userProfile={userProfile} defaultLinks={links} />*/}
      </div>
    </div>
  );
}
