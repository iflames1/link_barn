import Link from "next/link";
import { BsLink } from "react-icons/bs";
import Tab from "./common/tab";
import ButtonTab from "./common/button-tab";

export default function Header() {
  return (
    <nav className="p-4 bg-white rounded-xl flex items-center justify-between">
      <Link href="/" className="sm:flex items-center gap-2">
        <BsLink className="size-8 bg-base-dark text-white rounded-lg px-1" />
        <p className="text-2xl text-black font-extrabold sm:inline-flex hidden">
          link barn
        </p>
      </Link>

      <div className="flex lg:gap-4 items-center text-gray-dark">
        <Tab path="/links" title="Links" />

        <Tab path="/profile" title="Profile Details" />
      </div>

      <ButtonTab path="/preview" title="Preview" />
    </nav>
  );
}
