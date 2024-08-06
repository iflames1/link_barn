"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiLink } from "react-icons/fi";
import { BsLink } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { MdOutlineRemoveRedEye } from "react-icons/md";

export default function Header() {
  const pathname = usePathname();

  return (
    <nav className="p-4 bg-white rounded-xl flex items-center justify-between">
      <Link href="/" className="sm:flex items-center gap-2">
        <BsLink className="size-8 bg-base-dark text-white rounded-lg px-1" />
        <p className="text-2xl text-black font-extrabold sm:inline-flex hidden">
          link barn
        </p>
      </Link>

      <div className="flex lg:gap-4 items-center text-gray-dark">
        <Link
          href="links"
          className={`hS sm:py-3 py-4 px-7 sm:flex items-center gap-2 hover:text-base-dark ${
            pathname === "/links" && "text-base-dark bg-base-light rounded-lg"
          }`}
        >
          <FiLink className="size-4" />
          <p className="sm:inline-flex hidden">Links</p>
        </Link>

        <Link
          href="profile"
          className={`hS sm:py-3 py-4 px-7 sm:flex items-center gap-2 hover:text-base-dark ${
            pathname === "/profile" && "text-base-dark bg-base-light rounded-lg"
          }`}
        >
          <CgProfile className="size-4" />
          <p className="sm:inline-flex hidden">Profile Details</p>
        </Link>
      </div>

      <Link
        href="preview"
        className={`button px-4 border-[1px] border-base-dark text-base-dark hover:bg-base-light ${
          pathname === "/preview" && "bg-base-light"
        }`}
      >
        <p className="sm:inline-flex hS hidden">Preview</p>
        <MdOutlineRemoveRedEye className="inline-flex sm:hidden size-4" />
      </Link>
    </nav>
  );
}
