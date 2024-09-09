"use client";
import PreviewLayout from "../preview/preview-layout";
import { layouts } from "../appearance/layouts";
import { useUserdata } from "@/lib/useUserdata";

export default function Preview() {
  const { userData } = useUserdata();
  const links = userData?.links;
  const layoutName = userData?.appearance || "layout1";
  const selectedLayout = layouts.find((layout) => layout.name === layoutName);
  const LayoutComponent =
    selectedLayout?.LayoutComponent || layouts[0].LayoutComponent;

  return (
    <PreviewLayout>
      <LayoutComponent userData={userData} links={links} />
    </PreviewLayout>
  );
}
