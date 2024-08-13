import { HiMenuAlt4 } from "react-icons/hi";
import { FiLink } from "react-icons/fi";
import { SelectLink } from "./select-link";

interface LinkEditorProps {
  id: string;
  setLinkIds: React.Dispatch<React.SetStateAction<string[]>>;
  index: number;
}

export default function LinkEditor({ id, setLinkIds, index }: LinkEditorProps) {
  const removeLink = (idToRemove: string) => {
    setLinkIds((prevIds) => prevIds.filter((id) => id !== idToRemove));
  };

  return (
    <form>
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
          <SelectLink />
        </div>
        <div>
          <p className="bS text-black">Link</p>
          <div
            className={`flex items-center gap-3 px-4 py-3 border-[1px] border-gray rounded-lg bg-white focus-within:shadow-active`}
          >
            <label htmlFor="link" className="cursor pointer">
              <FiLink className="size-4 text-gray-dark" />
            </label>
            <input
              id="link"
              type="text"
              placeholder="e.g. https://www.github.com/iflames1"
              className="placeholder:text-gray-dark text-black w-full border-none outline-none"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
