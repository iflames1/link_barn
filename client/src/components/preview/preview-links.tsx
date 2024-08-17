import { Link } from "@/utils/linkSync";
import { FaArrowRight } from "react-icons/fa6";
import { linkAttributes } from "../common/links-attr";

interface PreviewProps {
  links: Link[];
}

export default function PreviewLinks({ links }: PreviewProps) {
  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-60">
      {links?.length < 1
        ? Array(4)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="bg-gray-preview w-full h-11 rounded-lg"
              ></div>
            ))
        : links?.map((link, index) => {
            const normalizedLinkName =
              link.name.toLowerCase() as keyof typeof linkAttributes;
            const attributes =
              linkAttributes[normalizedLinkName] || linkAttributes.link;

            return (
              <a
                href={link.url}
                target="_blank"
                key={index}
                className={`flex justify-between items-center py-[11px] px-4 rounded-lg w-full border-[1px] border-gray capitalize ${attributes.bg} ${attributes.text}`}
              >
                <p className="flex items-center justify-start gap-2">
                  {attributes.icon}
                  <span>{link.name}</span>
                </p>
                <FaArrowRight className="size-4" />
              </a>
            );
          })}
    </div>
  );
}
