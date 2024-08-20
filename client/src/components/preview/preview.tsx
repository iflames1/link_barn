import PreviewLinks from "./preview-links";
import PreviewProfile from "./preview-profile";

export default function Preview() {
  return (
    <div className="w-full h-full px-[18%] pt-[53px] flex flex-col items-center gap-14">
      <PreviewProfile />
      <PreviewLinks />
    </div>
  );
}
