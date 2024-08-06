import Image from "next/image";
import Link from "next/link";
import { FiLink } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

export default function Header() {
  return (
    <nav className="p-4 bg-white rounded-xl flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src={"/images/logo.svg"}
          alt="link barn logo"
          width={32}
          height={32}
        />
        <p className="text-2xl text-black font-extrabold">link barn</p>
      </Link>
      <div className="flex gap-4 items-center text-grey-dark">
        <Link
          href="links"
          className="text-base font-semibold py-3 px-7 flex items-center gap-2 bg-base-light rounded-lg text-base-dark"
        >
          <FiLink className="size-5 " />
          <p>Links</p>
        </Link>
        <Link
          href="profile"
          className=" text-base font-semibold py-3 px-7 flex items-center gap-2 hover:text-base-dark"
        >
          <CgProfile className="size-5" />
          <p>Profile Details</p>
        </Link>
      </div>
      <Link
        href="preview"
        className="py-3 px-7 border-[1px] border-base-dark rounded-lg text-base-dark hover:bg-base-normal"
      >
        Preview
      </Link>
    </nav>
  );
}
