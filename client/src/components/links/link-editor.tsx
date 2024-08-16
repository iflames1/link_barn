import { HiMenuAlt4 } from "react-icons/hi";
import { FiLink } from "react-icons/fi";
import { SelectLink } from "./select-link";
import { useLinkSync } from "@/utils/linkSync";

interface LinkEditorProps {
  index: number;
  link: {
    id: string;
    name: string;
    url: string;
  };
  removeLink: (id: string) => void;
}

export default function LinkEditor({
  index,
  link,
  removeLink,
}: LinkEditorProps) {
  console.log(link);
  console.log(index);

  return (
    <div className="p-5 bg-gray-light rounded-xl flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-gray-dark">
          <HiMenuAlt4 className="size-4" />
          <span className="text-base font-bold">Link #{index + 1}</span>
        </p>
        <button
          onClick={() => {
            removeLink(link.id);
          }}
          type="button"
          className="text-base font-normal text-gray-dark"
        >
          Remove
        </button>
      </div>
      <div>
        <p className="bS text-black">Platform</p>
        <SelectLink selectedPlatform={link.name || "link"} />
      </div>
      <div>
        <p className="bS text-black">Link</p>
        <div
          className={`flex items-center gap-3 px-4 py-3 border-[1px] border-gray rounded-lg bg-white focus-within:shadow-active`}
        >
          <label htmlFor={link.id} className="cursor pointer">
            <FiLink className="size-4 text-gray-dark" />
          </label>
          <input
            id={link.id}
            type="text"
            value={link.url}
            placeholder="e.g. https://www.portfolio.com/iflames"
            className="placeholder:text-gray-dark text-black w-full border-none outline-none"
          />
        </div>
      </div>
    </div>
  );
}
