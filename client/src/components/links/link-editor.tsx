import { HiMenuAlt4 } from "react-icons/hi";
import { FiLink } from "react-icons/fi";
import { SelectLink } from "./select-link";
import { RiLinkM } from "react-icons/ri";

interface LinkEditorProps {
  id: string;
  setAllLinks: React.Dispatch<React.SetStateAction<string[]>>;
  index: number;
  link: {
    name: string;
    url: string;
  };
}

export default function LinkEditor({
  id,
  setAllLinks,
  index,
  link,
}: LinkEditorProps) {
  const removeLink = (idToRemove: string) => {
    setAllLinks((prevIds) => prevIds.filter((id) => id !== idToRemove));
  };

  return (
    <div className="p-5 bg-gray-light rounded-xl flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-gray-dark">
          <HiMenuAlt4 className="size-4" />
          <span className="text-base font-bold">Link #{index + 1}</span>
        </p>
        <button
          onClick={() => removeLink(id)}
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
          <label htmlFor={id} className="cursor pointer">
            <FiLink className="size-4 text-gray-dark" />
          </label>
          <input
            id={id}
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
