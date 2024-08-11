// src/utils/linkSync.ts

import { useState, useCallback } from "react";

interface Link {
  id: string;
  url: string;
  title: string;
}

export const useLinkSync = (initialLinks: Link[] = []) => {
  const [links, setLinks] = useState<Link[]>(initialLinks);

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
    addLink,
    updateLink,
    removeLink,
  };
};
