"use client";
import { useEffect, useState } from "react";
import Preview from "../preview/preview";
import { useLinkSync } from "@/utils/linkSync";
import GetStarted from "./get-started";
import LinkEditor from "./link-editor";

export default function Links() {
  const [linkIsEmpty, setLinkEmpty] = useState(true);
  const [linkIds, setLinkIds] = useState<string[]>([]);
  const { links, getLinks } = useLinkSync();
  const [allLinks, setAllLinks] =
    useState<Array<{ id: string; name: string; url: string }>>(links);

  console.log(links);
  console.log(allLinks);

  useEffect(() => {
    getLinks();
    if (links.length == 0) {
      setLinkEmpty(false);
    }
  }, []);

  const addNewLink = () => {
    const newId = Date.now().toString();
    setAllLinks((prevLinks) => [
      ...prevLinks,
      { id: newId, name: "", url: "" },
    ]);
  };

  return (
    <div className="lg:flex gap-6 w-full">
      <Preview className="w-[40vw] lg:flex hidden" />
      <form className="bg-white flex flex-col justify-between rounded-xl lg:w-[60%] z-0 h-[calc(100vh-152px)] overflow-auto">
        <div className="sm:p-10 p-6">
          <div className="pb-6  relative">
            <h2 className="hM text-black pb-2">Customize your links</h2>
            <p className="bM text-gray-dark pb-10">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </p>
            <div className="sticky top-0 bg-white">
              <button
                onClick={() => addNewLink()}
                type="button"
                className="hS text-base-dark border-[1px] border-base-dark hover:bg-base-light py-[11px] px-7 rounded-lg w-full"
              >
                + Add new link
              </button>
            </div>
          </div>
          <div className=" flex flex-col gap-6">
            {linkIsEmpty ? (
              <GetStarted />
            ) : (
              links.map((link, index) => (
                <LinkEditor
                  key={link.id}
                  index={index}
                  id={link.id}
                  link={link}
                  setAllLinks={setAllLinks}
                />
              ))
            )}
          </div>
        </div>
        <div>
          <hr className="h-[1px] bg-gray border-none" />
          <div className="sm:py-6 sm:px-10 p-4 flex justify-end">
            <button
              className={`hS button text-white bg-base-dark ${
                linkIsEmpty && "opacity-25"
              } sm:w-fit w-full`}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
