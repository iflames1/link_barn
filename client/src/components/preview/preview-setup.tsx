import PreviewLinks from "./preview-links";
import PreviewProfile from "./preview-profile";
import { Link, UserProfileDetails } from "@/utils/linkSync";

interface PreviewProps {
  links: Link[];
  userProfileDetails: UserProfileDetails | null;
  className?: string;
}

export default function PreviewSetup({
  links,
  userProfileDetails,
  className,
}: PreviewProps) {
  return (
    <div
      className={`p-6 rounded-xl bg-white flex justify-center items-center ${className}`}
    >
      <div className="lg:max-h-[calc(100vh-192px)] overflow-y-auto overflow-x-hidden">
        <div className="border-[1px] border-gray-dark rounded-[56px] max-w-[100vw] sm:w-[307px] h-[631px] p-[11px] relative">
          <div className="border-[1px] border-gray-dark rounded-[45px] w-full h-full px-6 pt-[53px] flex flex-col items-center gap-14 overflow-y-auto">
            <PreviewProfile userProfileDetails={userProfileDetails} />
            <PreviewLinks links={links} />
          </div>
        </div>
      </div>
    </div>
  );
}
