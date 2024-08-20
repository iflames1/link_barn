import { HiMenuAlt4 } from "react-icons/hi";
import { FiLink } from "react-icons/fi";
import { SelectLink } from "./select-link";
import { Link } from "@/utils/linkSync";
import { useAppContext } from "@/context";

export default function LinkEditor() {
  const handleUpdateURL = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    updateLink(id, { url: e.target.value });
  };

  const { links, removeLink, updateLink } = useAppContext();

  return links.map((link: Link) => (
    <div
      key={link.id}
      className="p-5 bg-gray-light rounded-xl flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-gray-dark">
          <HiMenuAlt4 className="size-4" />
          <span className="text-base font-bold">Link #{link.index + 1}</span>
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
        <SelectLink updateLink={updateLink} link={link} />
      </div>
      <div>
        <p className="bS text-black">Link</p>
        <div
          className={`flex items-center gap-3 px-4 py-3 border-[1px] border-gray rounded-lg bg-white focus-within:shadow-active`}
        >
          <label htmlFor={link.id} className="cursor-pointer">
            <FiLink className="size-4 text-gray-dark" />
          </label>
          <input
            id={link.id}
            type="text"
            value={link.url}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleUpdateURL(e, link.id)
            }
            placeholder="e.g. https://www.portfolio.com/iflames"
            className="placeholder:text-gray-dark text-black w-full border-none outline-none"
          />
        </div>
      </div>
    </div>
  ));
}
