import Link from "next/link";
import Tab from "./common/tab";
import ButtonTab from "./common/button-tab";
import Image from "next/image";

export default function Header() {
  return (
    <nav className="p-4 bg-white rounded-xl flex items-center justify-between">
      <Link href="/" className="sm:flex items-center gap-2">
        <Image
          src={"/images/unik.png"}
          alt="logo"
          width={32}
          height={32}
          className="size-8 bg-base-dark text-white rounded-lg px-1"
        />
        {/*<BsLink className="size-8 bg-base-dark text-white rounded-lg px-1" />*/}
        <p className="text-2xl text-black font-extrabold sm:inline-flex hidden">
          link barn
        </p>
      </Link>

      <div className="flex lg:gap-4 items-center text-gray-dark">
        <Tab path="/user/links" title="Links" />

        <Tab path="/user/profile" title="Profile Details" />
      </div>

      <ButtonTab path="/user/preview" title="Preview" />
    </nav>
  );
}
