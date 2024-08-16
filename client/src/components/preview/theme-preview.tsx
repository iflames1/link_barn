import { getUserUUID } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { testLinks } from "@/data/links";

export default function ThemesPreview({
  className,
  theme,
}: {
  className?: string;
  theme: any;
}) {
  const uuid = getUserUUID();

  return (
    <div
      className={`p-6 rounded-xl bg-white flex justify-center items-center ${className}`}
    >
      <div className="lg:max-h-[calc(100vh-192px)] overflow-y-auto overflow-x-hidden">
        <div className="border-[1px] border-gray-dark rounded-[56px] max-w-[100vw] sm:w-[307px] h-[631px] p-[11px] relative">
          <div
            className={cn(
              "border-[1px] border-gray-dark rounded-[45px] w-full h-full px-6 pt-[53px] flex flex-col items-center gap-14 overflow-y-auto",
              theme.background.value,
            )}
          >
            <div
              className="flex flex-col items-center gap-[25px]"
              suppressHydrationWarning
            >
              {uuid}
              <div className="bg-gray-preview size-24 rounded-full"></div>
              <div className=" flex flex-col items-center gap-[13px]">
                <p
                  className={cn(
                    "self-center",
                    `${theme.text.titleColor} ${theme.text.titleFontSize}`,
                  )}
                >
                  Name
                </p>
                <p
                  className={cn(
                    "self-center",
                    `${theme.text.descriptionColor} ${theme.text.descriptionFontSize}`,
                  )}
                >
                  Email
                </p>
                {/* <div className="bg-gray-preview w-[72px] h-2 rounded-full"></div> */}
              </div>
            </div>
            <ThemePreviewLink links={theme.links} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const ThemePreviewLink = ({
  links,
  className,
}: {
  links: any;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col gap-4 w-full", className)}>
      {testLinks.map((link, index) => (
        <a
          className={cn(
            "flex justify-between items-center py-[11px] px-4 rounded-lg w-full border-[1px] border-gray transition-colors duration-200",
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
