"use client";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";

export interface Link {
  id: string;
  name: string;
  url: string;
}

interface LinkData {
  uuid: string;
  platform: string;
  index: number;
  url: string;
  user_id: string;
}

export const useLinkSync = (initialLinks: Link[] = []) => {
  const [links, setLinks] = useState<Link[]>(initialLinks);

  async function getLinks(url: string = "/data.json") {
    try {
      const response = await axios.get<LinkData[]>(url);
      const extractedLinks: Link[] = response.data.map((item) => ({
        id: item.uuid,
        name: item.platform,
        url: item.url,
      }));
      setLinks(extractedLinks);
    } catch (error) {
      console.error(error);
    }
  }

  const addNewLink = useCallback(() => {
    const newLink: Link = { id: Date.now().toString(), name: "", url: "" };
    setLinks((prevLinks) => [...prevLinks, newLink]);
  }, []);

  const updateLink = useCallback((id: string, updatedLink: Partial<Link>) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === id ? { ...link, ...updatedLink } : link
      )
    );
  }, []);

  const removeLink = useCallback((id: string) => {
    setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
  }, []);

  useEffect(() => {
    getLinks();
  }, []);

  return {
    links,
    setLinks,
    getLinks,
    addNewLink,
    updateLink,
    removeLink,
  };
};
