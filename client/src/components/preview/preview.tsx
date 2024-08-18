"use client";
import PreviewLinks from "./preview-links";
import PreviewProfile from "./preview-profile";
import { useLinkSync } from "@/utils/linkSync";

export default function Preview() {
  const { links, userProfileDetails } = useLinkSync();
  return (
    <div className="w-full h-full px-[18%] pt-[53px] flex flex-col items-center gap-14">
      <PreviewProfile userProfileDetails={userProfileDetails} />
      <PreviewLinks links={links} />
    </div>
  );
}
