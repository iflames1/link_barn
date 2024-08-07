"use client";
import { useState } from "react";
import Preview from "../Preview";
import GetStarted from "./GetStarted";
import LinkEditor from "./LinkEditor";

export default function Links() {
  const [addLink, setAddLink] = useState(false);
  return (
    <div className="lg:flex gap-6 w-full">
      <Preview className="w-[40vw] lg:flex hidden" />
      <div className="bg-white flex flex-col justify-between rounded-xl lg:w-[60%] z-0">
        <div className="sm:p-10 p-6">
          <div className="pb-6">
            <h2 className="hM text-black pb-2">Customize your links</h2>
            <p className="bM text-gray-dark pb-10">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </p>
            <button
              onClick={() => setAddLink(true)}
              className="hS text-base-dark border-[1px] border-base-dark hover:bg-base-light py-[11px] px-7 rounded-lg w-full"
            >
              + Add new link
            </button>
          </div>
          <div className="min-h-[calc(100vh-518px)]">
            {addLink ? <LinkEditor /> : <GetStarted />}
          </div>
        </div>
        <div>
          <hr className="h-[1px] bg-gray border-none" />
          <div className="sm:py-6 sm:px-10 p-4 flex justify-end">
            <button
              className={`hS button text-white bg-base-dark ${
                !addLink && "opacity-25"
              } sm:w-fit w-full`}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
