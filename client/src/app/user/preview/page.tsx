import Header from "@/components/header";
import Preview from "@/components/preview/preview";
import Link from "next/link";
import { getUserProfile } from "@/lib/queries";
import { cookies } from "next/headers";
import dynamic from "next/dynamic";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { LoaderCircle } from "lucide-react";
import SignOut from "./sign-out";

const ShareLink = dynamic(
  () => import("@/components/preview/share").then((mod) => mod.ShareLink),
  {
    ssr: false,
    loading: () => (
      <Dialog open>
        <DialogContent>
          <LoaderCircle className="animate-spin" />
        </DialogContent>
      </Dialog>
    ),
  }
);

export default async function PreviewPage() {
  const userProfileDetails = await getUserProfile(
    cookies().get("uuid")?.value || ""
  );
  const links = await userProfileDetails?.links;
  console.log(links, userProfileDetails);

  return (
    <div className="sm:p-6 w-full max-w-[1440px] mx-auto">
      <Header />
      {/*<div className="flex justify-between items-center gap-4 px-6 py-4 md:p-6">
          <Link
            href={"/user/links"}
            className="hS py-[11px] px-[27px] border-[1px] hover:bg-base-light text-base-dark border-base-dark rounded-lg"
          >
            Back to Editor
          </Link>
         <div className="hS py-[11px] px-[27px] bg-base-dark text-white hover:bg-opacity-90 rounded-lg cursor-pointer">
            Share Link
          </div>
          <ShareLink UUID={cookies().get("uuid")?.value || ""} />
        </div>*/}
      <div className="sm:p-0 sm:pt-6 p-4">
        <div className="bg-white rounded-xl sm:sm:h-[calc(100vh-152px)] h-[calc(100vh-96.37px)] h-[calc(100vh-96.37px)] overflow-y-auto sm:p-10 p-6">
          <Preview
            userProfileDetails={userProfileDetails}
            links={userProfileDetails && userProfileDetails.links}
          />
          <Link
            href="/user/themes"
            className="hS py-2 px-[27px] bg-base-dark text-white hover:bg-opacity-90 rounded-md cursor-pointer"
          >
            Change Appearance
          </Link>
        </div>
      </div>
    </div>
  );
}
