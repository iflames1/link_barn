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

  const addNewLink = useCallback(() => {
    const newLink: Link = {
      id: Date.now().toString(),
      name: "",
      url: "",
      index: links.length,
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
    setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
  }, []);

  useEffect(() => {
    getLinks();
  }, []);

  return {
    links,
    userProfileDetails,
    setLinks,
    getLinks,
    addNewLink,
    updateLink,
    updateUserProfile,
    removeLink,
  };
};
