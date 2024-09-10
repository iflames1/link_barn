"use client";
import PreviewLayout from "./preview-layout";
import { layouts } from "./layouts";
import { UserData } from "@/types/links";
interface PreviewProps {
  userProfileDetails: UserData | undefined;
}
export default function Preview({ userProfileDetails }: PreviewProps) {
  const links = userProfileDetails?.links;
  const layoutName = userProfileDetails?.appearance || "layout1";
  const selectedLayout = layouts.find((layout) => layout.name === layoutName);
  const LayoutComponent =
    selectedLayout?.LayoutComponent || layouts[0].LayoutComponent;

  return (
    <PreviewLayout>
      <LayoutComponent userData={userProfileDetails} links={links} />
    </PreviewLayout>
  );
}
