import React from "react";
import Image from "next/image";
import {
  FaArrowRight,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaTiktok,
} from "react-icons/fa";
import CircularImage from "@/components/appearance/layouts";

// Dummy data for preview
const dummyUserData = {
  first_name: "John Doe",
  username: "johndoe",
  profile_picture: "/placeholder.svg?height=104&width=104",
  bio: "Digital creator | Travel enthusiast | Coffee lover",
  theme: "light",
};

const dummyLinks = [
  {
    uuid: "1",
    platform: "instagram",
    url: "https://instagram.com/johndoe",
    icon: <FaInstagram />,
    bg: "bg-pink-100",
    text: "text-pink-600",
  },
  {
    uuid: "2",
    platform: "twitter",
    url: "https://twitter.com/johndoe",
    icon: <FaTwitter />,
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  {
    uuid: "3",
    platform: "youtube",
    url: "https://youtube.com/johndoe",
    icon: <FaYoutube />,
    bg: "bg-red-100",
    text: "text-red-600",
  },
  {
    uuid: "4",
    platform: "linkedin",
    url: "https://linkedin.com/in/johndoe",
    icon: <FaLinkedin />,
    bg: "bg-blue-100",
    text: "text-blue-800",
  },
  {
    uuid: "5",
    platform: "tiktok",
    url: "https://tiktok.com/@johndoe",
    icon: <FaTiktok />,
    bg: "bg-black",
    text: "text-white",
  },
];

// Helper function to get first letter
function getFirstLetter(str?: string) {
  return str ? str.charAt(0) : "";
}

// Layout 3: Minimalist
export function Layout3() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{dummyUserData.first_name}</h1>
        <p className="text-gray-600">{dummyUserData.bio}</p>
      </div>
      <div className="space-y-4">
        {dummyLinks.map((link) => (
          <a
            key={link.uuid}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                {React.cloneElement(link.icon, { className: "w-5 h-5 mr-3" })}
                {link.platform}
              </span>
              <FaArrowRight className="w-4 h-4" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// Layout 4: Card-based
export function Layout4() {
  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <Image
          src={dummyUserData.profile_picture}
          alt={dummyUserData.first_name}
          width={80}
          height={80}
          className="rounded-full mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-center mb-2">
          {dummyUserData.first_name}
        </h1>
        <p className="text-gray-600 text-center mb-4">{dummyUserData.bio}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {dummyLinks.map((link) => (
          <a
            key={link.uuid}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col items-center justify-center p-4 rounded-lg ${link.bg} ${link.text} transition duration-300 hover:opacity-80`}
          >
            {React.cloneElement(link.icon, { className: "w-8 h-8 mb-2" })}
            <span className="text-sm">{link.platform}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

// Layout 5: Sidebar
export function Layout5() {
  return (
    <div className="flex max-w-4xl mx-auto bg-white shadow-lg">
      <div className="w-1/3 bg-gray-100 p-6">
        <Image
          src={dummyUserData.profile_picture}
          alt={dummyUserData.first_name}
          width={120}
          height={120}
          className="rounded-full mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-center mb-2">
          {dummyUserData.first_name}
        </h1>
        <p className="text-gray-600 text-center mb-4">{dummyUserData.bio}</p>
      </div>
      <div className="w-2/3 p-6">
        <div className="grid gap-4">
          {dummyLinks.map((link) => (
            <a
              key={link.uuid}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between p-4 rounded-lg ${link.bg} ${link.text} transition duration-300 hover:opacity-80`}
            >
              <span className="flex items-center">
                {React.cloneElement(link.icon, { className: "w-5 h-5 mr-3" })}
                {link.platform}
              </span>
              <FaArrowRight className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// Layout 6: Dark Mode
export function Layout6() {
  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 text-white">
      <div className="text-center mb-8">
        <CircularImage
          src={dummyUserData.profile_picture}
          alt={dummyUserData.first_name}
          className="w-24 h-24 mx-auto mb-4 border-2 border-white"
        />
        <h1 className="text-3xl font-bold mb-2">{dummyUserData.first_name}</h1>
        <p className="text-gray-400">{dummyUserData.bio}</p>
      </div>
      <div className="space-y-4">
        {dummyLinks.map((link) => (
          <a
            key={link.uuid}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                {React.cloneElement(link.icon, { className: "w-5 h-5 mr-3" })}
                {link.platform}
              </span>
              <FaArrowRight className="w-4 h-4" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// Layout 7: Gradient Background
export function Layout7() {
  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 text-white">
      <div className="text-center mb-8">
        <CircularImage
          src={dummyUserData.profile_picture}
          alt={dummyUserData.first_name}
          className="w-24 h-24 mx-auto mb-4 border-2 border-white"
        />
        <h1 className="text-3xl font-bold mb-2">{dummyUserData.first_name}</h1>
        <p className="text-gray-100">{dummyUserData.bio}</p>
      </div>
      <div className="space-y-4">
        {dummyLinks.map((link) => (
          <a
            key={link.uuid}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition duration-300"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                {React.cloneElement(link.icon, { className: "w-5 h-5 mr-3" })}
                {link.platform}
              </span>
              <FaArrowRight className="w-4 h-4" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// Layout 8: Minimalist Circles
export function Layout8() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white">
      <div className="text-center mb-8">
        <CircularImage
          src={dummyUserData.profile_picture}
          alt={dummyUserData.first_name}
          className="w-24 h-24 mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{dummyUserData.first_name}</h1>
        <p className="text-gray-600">{dummyUserData.bio}</p>
      </div>
      <div className="flex justify-center space-x-4">
        {dummyLinks.map((link) => (
          <a
            key={link.uuid}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-12 h-12 flex items-center justify-center rounded-full ${link.bg} ${link.text} transition duration-300 hover:opacity-80`}
          >
            {React.cloneElement(link.icon, { className: "w-6 h-6" })}
          </a>
        ))}
      </div>
    </div>
  );
}

// Layout 9: Neon Glow
export function Layout9() {
  return (
    <div className="max-w-md mx-auto p-6 bg-black text-white">
      <div className="text-center mb-8">
        <CircularImage
          src={dummyUserData.profile_picture}
          alt={dummyUserData.first_name}
          className="w-24 h-24 mx-auto mb-4 border-2 border-neon-blue"
        />
        <h1 className="text-3xl font-bold mb-2 text-neon-blue">
          {dummyUserData.first_name}
        </h1>
        <p className="text-gray-400">{dummyUserData.bio}</p>
      </div>
      <div className="space-y-4">
        {dummyLinks.map((link) => (
          <a
            key={link.uuid}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border border-neon-blue rounded-lg hover:bg-neon-blue hover:bg-opacity-20 transition duration-300"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                {React.cloneElement(link.icon, {
                  className: "w-5 h-5 mr-3 text-neon-blue",
                })}
                <span className="text-neon-blue">{link.platform}</span>
              </span>
              <FaArrowRight className="w-4 h-4 text-neon-blue" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// Layout 10: Retro
export function Layout10() {
  return (
    <div className="max-w-md mx-auto p-6 bg-yellow-100 border-4 border-black">
      <div className="text-center mb-8">
        <div className="w-24 h-24 mx-auto mb-4 border-4 border-black rounded-full overflow-hidden">
          <Image
            src={dummyUserData.profile_picture}
            alt={dummyUserData.first_name}
            width={96}
            height={96}
          />
        </div>
        <h1 className="text-3xl font-bold mb-2 font-retro">
          {dummyUserData.first_name}
        </h1>
        <p className="text-gray-700 font-retro">{dummyUserData.bio}</p>
      </div>
      <div className="space-y-4">
        {dummyLinks.map((link) => (
          <a
            key={link.uuid}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white border-2 border-black rounded-none hover:bg-yellow-200 transition duration-300 font-retro"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                {React.cloneElement(link.icon, { className: "w-5 h-5 mr-3" })}
                {link.platform}
              </span>
              <FaArrowRight className="w-4 h-4" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// Layout 11: Polaroid
export function Layout11() {
  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100">
      <div className="bg-white p-4 shadow-lg transform rotate-2 mb-8">
        <Image
          src={dummyUserData.profile_picture}
          alt={dummyUserData.first_name}
          width={200}
          height={200}
          className="w-full h-48 object-cover mb-4"
        />
        <h1 className="text-2xl font-bold text-center mb-2">
          {dummyUserData.first_name}
        </h1>
        <p className="text-gray-600 text-center">{dummyUserData.bio}</p>
      </div>
      <div className="space-y-4">
        {dummyLinks.map((link) => (
          <a
            key={link.uuid}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                {React.cloneElement(link.icon, { className: "w-5 h-5 mr-3" })}
                {link.platform}
              </span>
              <FaArrowRight className="w-4 h-4" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// Layout 12: Glassmorphism
export function Layout12() {
  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="backdrop-filter backdrop-blur-lg bg-white bg-opacity-20 rounded-xl p-6 border border-white border-opacity-20">
        <div className="text-center mb-8">
          <CircularImage
            src={dummyUserData.profile_picture}
            alt={dummyUserData.first_name}
            className="w-24 h-24 mx-auto mb-4 border-2 border-white border-opacity-50"
          />
          <h1 className="text-3xl font-bold mb-2 text-white">
            {dummyUserData.first_name}
          </h1>
          <p className="text-gray-100">{dummyUserData.bio}</p>
        </div>
        <div className="space-y-4">
          {dummyLinks.map((link) => (
            <a
              key={link.uuid}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition duration-300"
            >
              <div className="flex items-center justify-between text-white">
                <span className="flex items-center">
                  {React.cloneElement(link.icon, { className: "w-5 h-5 mr-3" })}
                  {link.platform}
                </span>
                <FaArrowRight className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

const layouts = [
  { number: 3, component: Layout3 },
  { number: 4, component: Layout4 },
  { number: 5, component: Layout5 },
  { number: 6, component: Layout6 },
  { number: 7, component: Layout7 },
  { number: 8, component: Layout8 },
  { number: 9, component: Layout9 },
  { number: 10, component: Layout10 },
  { number: 11, component: Layout11 },
  { number: 12, component: Layout12 },
];

export default function LayoutDisplay() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Layout Display</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {layouts.map(({ number, component: LayoutComponent }) => (
          <div
            key={number}
            className="border-4 border-dashed border-gray-200 rounded-lg p-4"
          >
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Layout {number}
            </h2>
            <LayoutComponent />
          </div>
        ))}
      </div>
    </div>
  );
}
