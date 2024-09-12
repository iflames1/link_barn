"use client";
import { useAppContext } from "@/context";
import GetStarted from "./get-started";
import LinkEditor from "./link-editor";
import LoadingForm from "./loading";
import { Suspense, useEffect } from "react";
import { getUserUUID } from "@/lib/auth";
import { API_BASE_URL } from "@/lib/constants";

export default function Form() {
  const { getData, links, addNewLink, saveLinks } = useAppContext();

  useEffect(() => {
    const fetchUser = async () => {
      const userID = getUserUUID();
      if (userID) {
        //console.log("UUID", userID);
        const res = await getData(API_BASE_URL + "/users/?user_id=" + userID);
        if (res) {
          console.log("Successfully fetched user details");
        } else {
          console.log("failed to get user");
        }
      }
    };

    fetchUser();
  }, [getData]);

  const handleSaveLinks = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveLinks();
  };

  const handleAddNewLink = () => {
    const newID = addNewLink(links.length - 1);
    setTimeout(() => {
      const element = document.getElementById(newID);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        const input = element.querySelector("input");
        if (input) {
          input.focus();
        }
      }
    }, 0);
  };

  return (
    <form
      onSubmit={(e) => handleSaveLinks(e)}
      className="bg-white flex flex-col justify-between rounded-xl lg:w-[60%] z-0 sm:h-[calc(100vh-152px)] h-[calc(100vh-96.37px)] overflow-auto"
    >
      <div className="sm:p-10 p-6">
        <div className="pb-6  relative">
          <h2 className="hM text-black pb-2">Customize your links</h2>
          <p className="bM text-gray-dark pb-10">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
          <button
            onClick={handleAddNewLink}
            type="button"
            className="hS text-base-dark border-[1px] border-base-dark hover:bg-base-light py-[11px] px-7 rounded-lg w-full"
          >
            + Add new link
          </button>
        </div>
        <Suspense fallback={<LoadingForm />}>
          {links.length < 1 ? <GetStarted /> : <LinkEditor />}
        </Suspense>
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
  );
}
