"use client";
import PreviewSetup from "../preview/preview-setup";
import { useLinkSync } from "@/utils/linkSync";
import GetStarted from "./get-started";
import LinkEditor from "./link-editor";
import { useEffect, useState } from "react";
import Popup from "../popup";
import Loading from "@/app/loading";

export default function Links() {
  const {
    links,
    addNewLink,
    removeLink,
    updateLink,
    userProfileDetails,
    saveLinks,
  } = useLinkSync();
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (response) {
      setMessage("Successfully updated links");
    } else {
      setMessage("Failed to update links, Please try again");
    }
  }, [response]);

  const handleSaveLinks = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResponse(await saveLinks());
    setLoading(false);
    setShowPopup(true);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="lg:flex gap-6 w-full">
        <PreviewSetup
          links={links}
          userProfileDetails={userProfileDetails}
          className="w-[40vw] lg:flex hidden"
        />
        <form
          onSubmit={(e) => handleSaveLinks(e)}
          className="bg-white flex flex-col justify-between rounded-xl lg:w-[60%] z-0 h-[calc(100vh-152px)] overflow-auto"
        >
          <div className="sm:p-10 p-6">
            <div className="pb-6  relative">
              <h2 className="hM text-black pb-2">Customize your links</h2>
              <p className="bM text-gray-dark pb-10">
                Add/edit/remove links below and then share all your profiles
                with the world!
              </p>
              <div className="sticky top-0 bg-white">
                <button
                  onClick={() => addNewLink(links.length - 1)}
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
                links.map((link) => (
                  <LinkEditor
                    removeLink={removeLink}
                    updateLink={updateLink}
                    key={link.id}
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
                type="submit"
                className={`hS button text-white bg-base-dark hover:bg-opacity-90 ${
                  links.length < 1 && "opacity-25"
                } sm:w-fit w-full`}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
      {showPopup && (
        <Popup
          status={response}
          message={message}
          setShowPopup={setShowPopup}
        />
      )}
    </>
  );
}
