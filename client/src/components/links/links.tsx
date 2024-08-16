"use client";
import Preview from "../preview/preview";
import { useLinkSync } from "@/utils/linkSync";
import GetStarted from "./get-started";
import LinkEditor from "./link-editor";

export default function Links() {
  const { links, addNewLink, removeLink, updateLink, userProfileDetails } =
    useLinkSync();

  console.log(links);

  console.log(links.length < 1);

  return (
    <div className="lg:flex gap-6 w-full">
      <Preview
        links={links}
        userProfileDetails={userProfileDetails}
        className="w-[40vw] lg:flex hidden"
      />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-white flex flex-col justify-between rounded-xl lg:w-[60%] z-0 h-[calc(100vh-152px)] overflow-auto"
      >
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
            {links.length < 1 ? (
              <GetStarted />
            ) : (
              links.map((link, index) => (
                <LinkEditor
                  removeLink={removeLink}
                  updateLink={updateLink}
                  key={link.id}
                  index={link.index}
                  link={link}
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
                links.length < 1 && "opacity-25"
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
