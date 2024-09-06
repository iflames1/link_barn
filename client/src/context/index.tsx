"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/constants";
import { getUserUUID } from "@/lib/auth";
import { toast } from "sonner";
import { revalidateTagServer } from "@/app/actions";
import { checkUserExists } from "@/lib/queries";

interface LinkData {
  uuid: string;
  profile_picture: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  stx_address_mainnet: string;
  bio: string;
  links: {
    uuid: string;
    platform: string;
    index: number;
    url: string;
    user_id: string;
  }[];
}

export interface Link {
  id: string;
  name: string;
  index: number;
  url: string;
}

export interface UserProfileDetails {
  uuid: string;
  profile_picture: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  stx_address_mainnet: string;
  bio: string;
}

interface AppContextType {
  links: Link[];
  userProfileDetails: UserProfileDetails | null;
  getData: (url?: string) => Promise<boolean>;
  addNewLink: (index: number) => string;
  updateLink: (id: string, updatedLink: Partial<Link>) => void;
  removeLink: (id: string) => void;
  saveLinks: () => Promise<boolean>;
  updateUserProfile: (updatedProfile: Partial<UserProfileDetails>) => void;
  saveUserDetails: () => Promise<boolean>;
  saveUsername: (
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<Link[]>([]);
  const [prevlinks, setPrevLinks] = useState<Link[]>([]);
  const [userProfileDetails, setUserProfileDetails] =
    useState<UserProfileDetails | null>(null);
  const [prevUserProfileDetails, setPrevUserProfileDetails] =
    useState<UserProfileDetails | null>(null);
  const [UUID, setUUID] = useState<string | undefined>(undefined);

  useEffect(() => {
    setUUID(getUserUUID());
  }, []);

  const getData = useCallback(
    async (
      url: string = `${API_BASE_URL}/users/?user_id=${UUID}`
    ): Promise<boolean> => {
      try {
        const response = await axios.get<LinkData>(url);

        if (response.status === 200) {
          const extractedLinks: Link[] = response.data.links.map((item) => ({
            id: item.uuid,
            name: item.platform,
            url: item.url,
            index: item.index,
          }));

          const updateLinkIndexes = (links: Link[]): Link[] => {
            return links.map((link, index) => ({ ...link, index }));
          };

          const updatedLinks = updateLinkIndexes(extractedLinks);
          setLinks(updatedLinks);
          setPrevLinks(updatedLinks);

          const {
            uuid,
            profile_picture,
            first_name,
            last_name,
            username,
            email,
            stx_address_mainnet,
            bio,
          } = response.data;
          const profileDetails = {
            uuid,
            profile_picture,
            first_name,
            last_name,
            username,
            email,
            stx_address_mainnet,
            bio,
          };

          setUserProfileDetails(profileDetails);
          setPrevUserProfileDetails(profileDetails);
          console.log(userProfileDetails);

          return true;
        }

        console.warn(`Unexpected response status: ${response.status}`);
        return false;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.message);
        } else {
          console.error("Unexpected error:", error);
        }
        return false;
      }
    },
    [UUID]
  );

  const addNewLink = useCallback((index: number) => {
    const newID = Date.now().toString();
    const newLink: Link = {
      id: newID,
      name: "",
      url: "",
      index: index + 1,
    };
    setLinks((prevLinks) => [...prevLinks, newLink]);
    return newID;
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

  const saveLinks = useCallback(async () => {
    const updatedLinks = [];
    const newLinks = [];
    const deletedLinks = prevlinks.filter(
      (pl) => !links.some((l) => l.id === pl.id)
    );

    for (const link of links) {
      const prevLink = prevlinks.find((pl) => pl.id === link.id);
      if (
        prevLink &&
        (prevLink.name !== link.name ||
          prevLink.index !== link.index ||
          prevLink.url !== link.url)
      ) {
        updatedLinks.push(link);
      } else if (!prevLink) {
        newLinks.push(link);
      }
    }

    try {
      await Promise.all([
        ...updatedLinks.map((link) =>
          axios
            .patch(`${API_BASE_URL}/links/${link.id}`, {
              platform: link.name,
              index: link.index,
              url: link.url,
            })
            .then(() => console.log(`Updated link: ${link.name}`))
        ),
        ...newLinks.map((link) =>
          axios
            .post(`${API_BASE_URL}/links`, {
              platform: link.name,
              index: link.index,
              url: link.url,
              user_id: UUID,
            })
            .then(() => console.log(`Added new link: ${link.name}`))
        ),
        ...deletedLinks.map((link) =>
          axios
            .delete(`${API_BASE_URL}/links/${link.id}`)
            .then(() => console.log(`Deleted: ${link.name}`))
        ),
      ]);

      if (
        updatedLinks.length > 0 ||
        newLinks.length > 0 ||
        deletedLinks.length > 0
      ) {
        setPrevLinks(links);
        console.log("Links successfully synchronized with the server");
        toast.success("Your links have been updated", { richColors: true });
        return true;
      } else {
        console.log("No changes to synchronize");
        toast.info("No changes to save", { richColors: true });
        return true;
      }
    } catch (error) {
      console.error("Error synchronizing links:", error);
      toast.error("Failed to save your links", { richColors: true });
      return false;
    }
  }, [links, prevlinks, UUID]);

  const saveUserDetails = useCallback(async (): Promise<boolean> => {
    if (
      prevUserProfileDetails &&
      userProfileDetails &&
      (prevUserProfileDetails.first_name !== userProfileDetails.first_name ||
        prevUserProfileDetails.last_name !== userProfileDetails.last_name ||
        prevUserProfileDetails.username !== userProfileDetails.username ||
        prevUserProfileDetails.bio !== userProfileDetails.bio)
    ) {
      try {
        await axios.patch(`${API_BASE_URL}/users/${UUID}`, {
          first_name: userProfileDetails.first_name,
          last_name: userProfileDetails.last_name,
          profile_picture: userProfileDetails.profile_picture,
          username: userProfileDetails.username,
          email: userProfileDetails.email,
          stx_address_mainnet: userProfileDetails.stx_address_mainnet,
          bio: userProfileDetails.bio,
          // decentralized_id: null,
          // stx_address_testnet: null,
          // btc_address_mainnet: null,
          // btc_address_testnet: null,
          // wallet_provider: null,
          // public_key: null,
          // gaia_hub_url: null,
        });

        console.log("User details updated successfully");
        toast.success("Updated successfully.", { richColors: true });

        await revalidateTagServer("userProfile");
        setPrevUserProfileDetails(userProfileDetails);
        return true;
      } catch (error) {
        console.error("Error updating user details:", error);
        toast.error("Failed to save details, Please try again", {
          richColors: true,
        });
        return false;
      }
    } else {
      console.log("No changes to save");
      toast.info("No changes to save", { richColors: true });
      return true;
    }
  }, [prevUserProfileDetails, userProfileDetails, UUID]);

  const saveUsername = async (
    //username = userProfileDetails?.username,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const username = userProfileDetails?.username;
    if (!username || username.trim() === "") {
      toast.warning("Username can't be empty", {
        richColors: true,
      });
      setIsLoading(false);
      return;
    }

    // this is to reserve bns names
    if (username.toLowerCase().endsWith(".btc")) {
      toast.error("Usernames ending with '.btc' are reserved for BTC names", {
        richColors: true,
      });
      setIsLoading(false);
      return;
    }

    const res = await checkUserExists("username", username);
    if (res.status && userProfileDetails?.username !== username) {
      console.log("User with that username already exist");
      toast.error("User with that username already exist, try another");
      setIsLoading(false);
    } else {
      try {
        const res = await axios.patch(
          `${API_BASE_URL}/users/${userProfileDetails?.uuid}`,
          {
            username: username,
          }
        );
        const data = await res.data;
        await revalidateTagServer("userProfile");
        console.log(data);

        toast.success("Username updated successfully", {
          richColors: true,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
      setIsEditing(false);
    }
  };

  const contextValue: AppContextType = {
    links,
    userProfileDetails,
    getData,
    addNewLink,
    updateLink,
    removeLink,
    saveLinks,
    updateUserProfile,
    saveUserDetails,
    saveUsername,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }
  return context;
}
