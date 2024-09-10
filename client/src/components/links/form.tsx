"use client";
import { useAppContext } from "@/context";
import GetStarted from "./get-started";
import LinkEditor from "./link-editor";
import LoadingForm from "./loading";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { getUser } from "@/lib/getUser";
import { LinkSchema, UserData } from "@/types/links";
import { toast } from "sonner";
import { saveLinks } from "@/lib/savelinks";

interface FormProp {
  setUserProfileDetails: React.Dispatch<
    React.SetStateAction<UserData | undefined>
  >;
}

export default function Form({ setUserProfileDetails }: FormProp) {
  const {} = useAppContext();
  const initialLinks = useRef<LinkSchema[]>();
  const [links, setLinks] = useState<LinkSchema[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await getUser();
      if (result) {
        setUserProfileDetails(result.userData);
        setLinks(result.links);
        initialLinks.current = JSON.parse(JSON.stringify(result.links));
        console.log("User data fetched");
      }
    };
    fetchUserData();
  }, []);

  const addNewLink = (index: number) => {
    const newID = Date.now().toString();
    const newLink: LinkSchema = {
      platform: "",
      index: index + 1,
      link_title: "",
      url: "",
      user_id: "",
      uuid: newID,
    };
    setLinks((prev) => [...prev, newLink]);
    return newID;
  };

  const detectChanges = useCallback(() => {
    if (!links || !initialLinks.current)
      return { updatedLinks: [], newLinks: [], deletedLinks: [] };

    const updatedLinks: LinkSchema[] = [];
    const newLinks: LinkSchema[] = [];
    const deletedLinks: LinkSchema[] = [];

    // Check for updated and new links
    links.forEach((link) => {
      const initialLink = initialLinks.current?.find(
        (l) => l.uuid === link.uuid
      );
      if (initialLink) {
        if (JSON.stringify(link) !== JSON.stringify(initialLink)) {
          updatedLinks.push(link);
        }
      } else {
        newLinks.push(link);
      }
    });

    // Check for deleted links
    initialLinks.current.forEach((initialLink) => {
      if (!links.some((l) => l.uuid === initialLink.uuid)) {
        deletedLinks.push(initialLink);
      }
    });

    return { updatedLinks, newLinks, deletedLinks };
  }, [links]);

  const handleSaveLinks = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const changes = detectChanges();
    if (
      changes.updatedLinks.length === 0 &&
      changes.newLinks.length === 0 &&
      changes.deletedLinks.length === 0
    ) {
      toast.info("No changes to save", { richColors: true });
      return;
    }
    try {
      await saveLinks(
        changes.updatedLinks,
        changes.newLinks,
        changes.deletedLinks
      );
      initialLinks.current = JSON.parse(JSON.stringify(links)); // Update initial state after successful save
      toast.success("Links saved successfully", { richColors: true });
    } catch (error) {
      console.error("Error saving links:", error);
      toast.error("Failed to save links. Please try again later", {
        richColors: true,
      });
    }
  };

  const handleAddNewLink = () => {
    const newID = addNewLink(links ? links.length - 1 : 0);
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
