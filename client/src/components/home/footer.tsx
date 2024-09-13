import { DiscordLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { LogoLink } from "../ui/logo";
import dynamic from "next/dynamic";
const AuthButton = dynamic(() => import("../auth-button"), {
  ssr: false,
});

const footerNavs = [
  {
    label: "Product",
    items: [
      // {
      //   href: "/",
      //   name: "Email Collection",
      // },
      {
        href: "/pricing",
        name: "Pricing",
      },
      {
        href: "/#faqs",
        name: "FAQ",
      },
      {
        href: "/#features",
        name: "Features",
      },
    ],
  },

  {
    label: "Community",
    items: [
      {
        href: "https://discord.gg/d9HjRNRYgQ",
        name: "Discord",
      },
      {
        href: "https://x.com/linkbarn",
        name: "Twitter",
      },
      // {
      //   href: "mailto:hello@chatcollect.com",
      //   name: "Email",
      // },
    ],
  },
  {
    label: "Legal",
    items: [
      {
        href: "/terms",
        name: "Terms",
      },

      {
        href: "/policy",
        name: "Privacy & policy",
      },
    ],
  },
];

const footerSocials = [
  {
    href: "https://discord.gg/d9HjRNRYgQ",
    name: "Discord",
    icon: <DiscordLogoIcon className="size-4" />,
  },
  {
    href: "https://x.com/linkbarn",
    name: "Twitter",
    icon: <TwitterLogoIcon className="size-4" />,
  },
];

export function SiteFooter() {
  return (
    <footer>
      <div className="mx-auto w-full max-w-screen-xl xl:pb-2">
        <div className="gap-4 p-4 px-8 py-16 sm:pb-16 md:flex md:justify-between">
          <div className="mb-12 flex flex-col gap-4">
            <LogoLink footer />
            <p className="max-w-xs">A Link sharing app for everyone</p>
            <AuthButton />
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
            {footerNavs.map((nav) => (
              <div key={nav.label}>
                <h2 className="mb-6 text-sm font-medium uppercase tracking-tighter text-gray-900 dark:text-white">
                  {nav.label}
                </h2>
                <ul className="grid gap-2">
                  {nav.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="cursor-pointer text-sm font-[450] text-gray-400 duration-200 hover:text-gray-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-md border-neutral-700/20 px-8 py-4 pb-8 sm:flex sm:flex-row sm:items-center sm:justify-between">
          <div className="flex space-x-5 sm:mt-0 sm:justify-center">
            {footerSocials.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                className="fill-gray-500 text-gray-500 hover:fill-gray-900 hover:text-gray-900 dark:hover:fill-gray-600 dark:hover:text-gray-600"
              >
                {social.icon}
                <span className="sr-only">{social.name}</span>
              </Link>
            ))}
          </div>
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            Copyright © {new Date().getFullYear()}{" "}
            <Link href="/" className="cursor-pointer">
              Link Barn
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </div>
      {/* <SiteBanner /> */}
    </footer>
  );
}
