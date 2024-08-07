"use client";
import { HiMenuAlt4 } from "react-icons/hi";
import { SelectLink } from "./SelectLink";
import { FiLink } from "react-icons/fi";
import { useState } from "react";

export default function LinkEditor() {
  const [isActive, setIsActive] = useState(false);

  return (
    <form>
      <div className="p-5 bg-gray-light rounded-xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-gray-dark">
            <HiMenuAlt4 className="size-4" />
            <span className="text-base font-bold">Link #1</span>
          </p>
          <button className="text-base font-normal text-gray-dark">
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
            className={`flex items-center gap-3 px-4 py-3 border-[1px] border-gray rounded-lg bg-white ${
              isActive && "active-selection"
            }`}
          >
            <label htmlFor="link" className="cursor pointer">
              <FiLink className="size-4 text-gray-dark" />
            </label>
            <input
              id="link"
              type="text"
              onFocus={() => setIsActive(true)}
              onBlur={() => setIsActive(false)}
              placeholder="e.g. https://www.github.com/iflames1"
              className="placeholder:text-gray-dark text-black w-full border-none outline-none"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
