import { TbBrandGithubFilled } from "react-icons/tb";
import {
  FaDiscord,
  FaPinterest,
  FaReddit,
  FaSoundcloud,
  FaSpotify,
  FaSquareInstagram,
  FaTiktok,
  FaTwitch,
  FaXTwitter,
} from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { FaFacebook } from "react-icons/fa6";
import { FaLinkedin, FaSnapchat, FaTelegram } from "react-icons/fa";
import { RiLinkM } from "react-icons/ri";
import {
  SiBehance,
  SiBuymeacoffee,
  SiDribbble,
  SiEtsy,
  SiKofi,
  SiMedium,
  SiPatreon,
  SiShopify,
  SiSubstack,
  SiWix,
} from "react-icons/si";
import Image from "next/image";
import { text } from "stream/consumers";

const randomColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-cyan-500",
];

export const linkAttributes = {
  link: {
    text: "text-black",
    text2: "text-white",
    bg: "bg-gray-light",
    icon: <RiLinkM className="size-4" />,
  },
  twitter: {
    text: "text-white",
    text2: "text-[#43B7E9]",
    bg: "bg-[#43B7E9]",
    icon: <FaXTwitter className="size-4" />,
  },
  console: {
    text: "text-white",
    bg: "bg-[#1dd6b3]",
    icon: (
      <Image
        src={"/images/console.jpg"}
        alt="console"
        width={20}
        height={20}
        className="rounded-full"
      />
    ),
  },
  discord: {
    text: "text-white",
    text2: "text-[#5865F2]",
    bg: "bg-[#5865F2]",
    icon: <FaDiscord className="size-4" />,
  },
  telegram: {
    text: "text-white",
    text2: "text-[#0088cc]",
    bg: "bg-[#0088cc]",
    icon: <FaTelegram className="size-4" />,
  },
  bitflow: {
    text: "text-black",
    bg: "bg-[#00D1AC]",
    icon: (
      <Image
        src={"/images/bitflow.webp"}
        alt="bitflow"
        width={20}
        height={20}
      />
    ),
  },
  velar: {
    text: "text-[#df861b]",
    text2: "text-[#000000]",
    bg: "bg-[#000000]",
    icon: (
      <Image
        src="/images/velar.jpg"
        alt="velar"
        width={16}
        height={16}
        className="size-4"
      />
    ),
  },
  alex: {
    text: "text-[#1c4bff]",
    text2: "white",
    bg: "bg-white",
    icon: (
      <Image
        src="/images/alex.webp"
        alt="alex"
        width={16}
        height={16}
        className="size-4"
      />
    ),
  },
  stackswap: {
    text: "text-[#00FA8E]",
    text2: "text-[#001524]",
    bg: "bg-[#001524]",
    icon: (
      <Image
        src="/images/stackswap.png"
        alt="stackswap"
        width={16}
        height={8}
        className="w-4 h-2 my-1"
      />
    ),
  },
  charisma: {
    text: "text-white",
    bg: "bg-black",
    icon: (
      <Image
        src={"/images/charisma.jpg"}
        alt="charima"
        width={20}
        height={20}
        className="rounded-full"
      />
    ),
  },
  goat: {
    text: "text-[#fefffe]",
    bg: "bg-[#f36336]",
    icon: <Image src="/images/goat.jpg" alt="goat" width={16} height={16} />,
  },
  youtube: {
    text: "text-white",
    text2: "white",
    bg: "bg-[#EE3939]",
    icon: <IoLogoYoutube className="size-4" />,
  },
  github: {
    text: "text-white",
    text2: "white",
    bg: "bg-black",
    icon: <TbBrandGithubFilled className="size-4" />,
  },
  docs: {
    text: "text-black",
    bg: "bg-white",
    icon: (
      <Image src={"/images/gitbook.jpg"} alt="gitbook" width={20} height={20} />
    ),
  },
  medium: {
    text: "text-white",
    text2: "white",
    bg: "bg-[#00AB6C]",
    icon: <SiMedium className="size-4" />,
  },
  facebook: {
    text: "text-white",
    text2: "white",
    bg: "bg-[#2442AC]",
    icon: <FaFacebook className="size-4" />,
  },
  linkedin: {
    text: "text-white",
    text2: "white",
    bg: "bg-[#2D68FF]",
    icon: <FaLinkedin className="size-4" />,
  },
  instagram: {
    text: "text-white",
    text2: "white",
    bg: "bg-[#E4405F]",
    icon: <FaSquareInstagram className="size-4" />,
  },
  tiktok: {
    text: "text-white",
    text2: "white",
    bg: "bg-[#000000]",
    icon: <FaTiktok className="size-4" />,
  },
  substack: {
    text: "text-white",
    text2: "white",
    bg: "bg-[#FF6719]",
    icon: <SiSubstack className="size-4" />,
  },
  pinterest: {
    text: "text-white",
    text2: "white",
    bg: "bg-[#BD081C]",
    icon: <FaPinterest className="size-4" />,
  },
  snapchat: {
    text: "text-black",
    text2: "white",
    bg: "bg-[#FFFC00]",
    icon: <FaSnapchat className="size-4" />,
  },
  twitch: {
    text: "text-white",
    text2: "white",
    bg: "bg-[#9146FF]",
    icon: <FaTwitch className="size-4" />,
  },
  reddit: {
    text: "text-white",
    text2: "white",
    bg: "bg-[#FF4500]",
    icon: <FaReddit className="size-4" />,
  },
  behance: {
    text: "text-white",
    text2: "white",
    bg: "bg-[#1769FF]",
    icon: <SiBehance className="size-4" />,
  },
  dribbble: {
    text: "text-white",
    text2: "white",
    bg: "bg-[#EA4C89]",
    icon: <SiDribbble className="size-4" />,
  },
  patreon: {
    text: "text-white",
    text2: "white",
    bg: "bg-[#FF424D]",
    icon: <SiPatreon className="size-4" />,
  },
  kofi: {
    text: "text-white",
    text2: "white",
    bg: "bg-[#FF5E5B]",
    icon: <SiKofi className="size-4" />,
  },
  buymeacoffee: {
    text: "text-white",
    text2: "white",
    bg: "bg-[#FFDD00]",
    icon: <SiBuymeacoffee className="size-4" />,
  },
  spotify: {
    text: "text-white",
    text2: "white",
    bg: "bg-[#1DB954]",
    icon: <FaSpotify className="size-4" />,
  },
  soundcloud: {
    text: "text-white",
    text2: "white",
    bg: "bg-[#FF3300]",
    icon: <FaSoundcloud className="size-4" />,
  },
  etsy: {
    text: "text-white",
    text2: "white",
    bg: "bg-[#F1641E]",
    icon: <SiEtsy className="size-4" />,
  },
  shopify: {
    text: "text-white",
    text2: "white",
    bg: "bg-[#96BF48]",
    icon: <SiShopify className="size-4" />,
  },
  wix: {
    text: "text-white",
    text2: "white",
    bg: "bg-[#0C6EFC]",
    icon: <SiWix className="size-4" />,
  },
};
