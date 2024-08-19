import { getUserUUID } from "@/lib/auth";
import PreviewLinks from "./preview-links";
import { cn } from "@/lib/utils";
// import { theme } from "@/data/themes";
import { testLinks } from "@/data/links";
import { Theme } from "@/types/themes";

export default function ThemesPreviewButton({
  className,
  theme,
}: {
  className?: string;
  theme: Theme;
}) {
  const uuid = getUserUUID();
  // 250
  // 161

  // w-280 h-386
  return (
    <div
      className={cn(
        "h-[320px] rounded-[15px] flex flex-col px-4 py-4 items-center gap-6",
        `${theme.background.value}`,
      )}
    >
      <div>
        <div className="bg-gray-preview size-12 rounded-full"></div>
        <div className=" flex flex-col items-center gap-0 mt-1">
          <p className={cn("self-center", `${theme.text.titleColor}`)}>Name</p>
          <p
            className={cn(
              "self-center",
              `${theme.text.descriptionColor} ${theme.text.descriptionFontSize}`,
            )}
          >
            Email
          </p>
        </div>
      </div>
      <ThemePreviewLink links={theme.links} />
    </div>
  );
}

const ThemePreviewLink = ({ links }: { links: any }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {testLinks.slice(0, 3).map((link, index) => (
        <a
          className={cn(
            "flex justify-between items-center py-[5px] text-sm px-4 rounded-lg w-full border-[1px] border-gray transition-colors duration-200",
            `${links.text} ${links.bg} ${links.rounded} ${links.hoverBg} ${links.hoverText}`,
          )}
          key={link.uuid}
        >
          {link.platform}
        </a>
      ))}
    </div>
  );
};

// <div
//   className={`p-1 rounded-xl bg-white flex justify-center items-center ${className}`}
// >
//   <div className="lg:max-h-[calc(100vh-192px)] overflow-y-auto overflow-x-hidden">
//     {/* was 56 */}
//     {/* sm:w-[280px] */}
//     <div className="border-[1px] border-gray-dark rounded-[26px] w-full h-[386px] p-[8px] relative">
//       <div
//         className={cn(
//           "border-[1px] border-gray-dark rounded-[25px] w-full h-full px-6 pt-[20px] flex flex-col items-center gap-5 overflow-y-auto",
//           theme.background.value,
//         )}
//       >
//         <div
//           className="flex flex-col items-center gap-1"
//           suppressHydrationWarning
//         >
//           {uuid}
//           <div className="bg-gray-preview size-12 rounded-full"></div>
//           <div className=" flex flex-col items-center gap-[13px]">
//             {/* Skeleton */}
//             {/* <div className="bg-gray-preview w-40 h-4 rounded-full"></div> */}
//             <p className={cn("self-center", `${theme.text.titleColor}`)}>
//               Name
//             </p>
//             <p
//               className={cn(
//                 "self-center",
//                 `${theme.text.descriptionColor} ${theme.text.descriptionFontSize}`,
//               )}
//             >
//               Email
//             </p>
//             {/* <div className="bg-gray-preview w-[72px] h-2 rounded-full"></div> */}
//           </div>
//         </div>
//         <ThemePreviewLink links={theme.links} />
//       </div>
//     </div>
//   </div>
// </div>
