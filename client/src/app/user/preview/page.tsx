import { signOut } from "@/app/actions";
import Preview from "@/components/preview/preview";
import { Button } from "@/components/ui/button";
import { ShareLink } from "@/components/preview/share";
import Link from "next/link";
import { getUserProfile } from "@/lib/queries";
import { cookies } from "next/headers";

export default async function PreviewPage() {
  const userProfileDetails = await getUserProfile(
    cookies().get("uuid")?.value || "",
  );
  const links = await userProfileDetails?.links;
  console.log(links, userProfileDetails);

  return (
    <div className="w-full">
      <div className="w-full md:p-6">
        <div className="flex justify-between items-center gap-4 px-6 py-4 md:p-6">
          <Link
            href={"/links"}
            className="hS py-[11px] px-[27px] border-[1px] hover:bg-base-light text-base-dark border-base-dark rounded-lg"
          >
            Back to Editor
          </Link>
          {/*<div className="hS py-[11px] px-[27px] bg-base-dark text-white hover:bg-opacity-90 rounded-lg cursor-pointer">
            Share Link
          </div>*/}
          <ShareLink userProfileDetails={userProfileDetails} />
        </div>
      </div>
      <div className="w-full min-h-screen mx-auto relative">
        <Preview
          userProfileDetails={userProfileDetails}
          links={userProfileDetails && userProfileDetails.links}
        />
      </div>
      <div className="flex items-center justify-between mx-6 mb-5">
        <Link
          href="/user/themes"
          className="hS py-2 px-[27px] bg-base-dark text-white hover:bg-opacity-90 rounded-md cursor-pointer sticky"
        >
          Change Appearance
        </Link>
        <form action={signOut}>
          <Button className="bg-base-dark hover:bg-opacity-90 rounded-lg items-center justify-between">
            Sign Out
          </Button>
        </form>
      </div>
    </div>
  );
}
