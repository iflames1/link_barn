"use client";
import { useState, useCallback } from "react";
import axios from "axios";

interface Link {
  id: string;
  name: string;
  url: string;
  icon: string;
}

interface LinkData {
  [key: string]: {
    Name: string;
    Link: string;
    icon: string;
  };
}

export const useLinkSync = (initialLinks: Link[] = []) => {
  const [links, setLinks] = useState<Link[]>(initialLinks);

  async function getLinks(url: string = "/data.json") {
    try {
      const response = await axios.get<LinkData[]>(url);

      // Assuming the data is an array with a single object
      const linkObject = response.data[0];
      const extractedLinks: Link[] = Object.entries(linkObject).map(
        ([key, { Name, Link, icon }]) => ({
          id: key,
          name: Name,
          url: Link,
          icon,
        })
      );

      setLinks(extractedLinks);
    } catch (error) {
      console.error(error);
    }
  }

  const addLink = useCallback((newLink: Omit<Link, "id">) => {
    const linkWithId = { ...newLink, id: Date.now().toString() };
    setLinks((prevLinks) => [...prevLinks, linkWithId]);
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

  return {
    links,
    getLinks,
    addLink,
    updateLink,
    removeLink,
  };
};
