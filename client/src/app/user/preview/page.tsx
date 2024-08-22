import Preview from "@/components/preview/preview";
import { ShareLink } from "@/components/preview/share";
import Link from "next/link";

export default function PreviewPage() {
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
          <ShareLink />
        </div>
      </div>
      <div className="w-full min-h-screen mx-auto relative">
        <Preview />
      </div>
      <Link
        href="/themes"
        className="hS py-[11px] px-[27px] bg-base-dark text-white hover:bg-opacity-90 rounded-lg cursor-pointer sticky bottom-6 left-6"
      >
        Change Appearance
      </Link>
    </div>
  );
}
