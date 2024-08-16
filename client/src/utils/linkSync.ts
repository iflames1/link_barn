"use client";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/constants";
import { getUserUUID } from "@/lib/auth";

export interface Link {
  id: string;
  name: string;
  index: number;
  url: string;
}

interface LinkData {
  uuid: string;
  profile_picture: string;
  first_name: string;
  last_name: string;
  links: {
    uuid: string;
    platform: string;
    index: number;
    url: string;
    user_id: string;
  }[];
}

export interface UserProfileDetails {
  uuid: string;
  profile_picture: string;
  first_name: string;
  last_name: string;
}

export const useLinkSync = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [prevlinks, setPrevLinks] = useState<Link[]>([]);
  const [userProfileDetails, setUserProfileDetails] =
    useState<UserProfileDetails | null>(null);
  const UUID = getUserUUID();

  async function getLinks(
    url: string = API_BASE_URL + "/users/?user_id=" + UUID
  ) {
    try {
      const response = await axios.get<LinkData>(url);
      const extractedLinks: Link[] = response.data.links.map((item) => ({
        id: item.uuid,
        name: item.platform,
        url: item.url,
        index: item.index,
      }));
      setLinks(extractedLinks);
      setPrevLinks(extractedLinks);

      setUserProfileDetails({
        uuid: response.data.uuid,
        profile_picture: response.data.profile_picture,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
      });
    } catch (error) {
      console.error(error);
    }
  }

  const addNewLink = useCallback((index: number) => {
    const newLink: Link = {
      id: Date.now().toString(),
      name: "",
      url: "",
      index: index + 1,
    };
    setLinks((prevLinks) => [...prevLinks, newLink]);
  }, []);

  const updateLink = useCallback((id: string, updatedLink: Partial<Link>) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === id ? { ...link, ...updatedLink } : link
      )
    );
  }, []);

  const updateUserProfile = useCallback(
    (updatedProfile: Partial<UserProfileDetails>) => {
      setUserProfileDetails((prevDetails) => {
        if (!prevDetails) return null;
        return { ...prevDetails, ...updatedProfile };
      });
    },
    []
  );

  const removeLink = useCallback((id: string) => {
    setLinks((prevLinks) => {
      const updatedLinks = prevLinks
        .filter((link) => link.id !== id)
        .map((link, index) => ({ ...link, index }));
      return updatedLinks;
    });
  }, []);

  useEffect(() => {
    getLinks();
  }, []);

  const saveLinks = useCallback(async () => {
    if (JSON.stringify(prevlinks) !== JSON.stringify(links)) {
      for (const link of links) {
        try {
          const response = await axios.post(API_BASE_URL + "/links", {
            platform: link.name,
            index: link.index,
            url: link.url,
            user_id: UUID,
          });
          if (response.status === 200 || response.status === 201) {
            console.log("successfully posted", link.name);
            getLinks();
          }
        } catch (error) {
          console.error("Error saving link:", error);
        }
      }
      setPrevLinks(links);
    }
  }, [links, prevlinks, UUID, getLinks]);

  return {
    links,
    userProfileDetails,
    setLinks,
    getLinks,
    addNewLink,
    updateLink,
    updateUserProfile,
    removeLink,
    saveLinks,
  };
};
