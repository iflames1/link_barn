"use client";
import Link from "next/link";
import Image from "next/image";
import error from "/public/error.gif";
import { useRouter } from "next/navigation";
import { HeroScrollDemo } from "@/components/home/container-scroll";
import { HeaderDemo } from "@/components/ui/header/home-header";
import { SiteFooter } from "@/components/home/footer";

export default function ErrorPage() {
  const router = useRouter();

  const reload = () => {
    router.refresh();
  };

  return (
    <div className="bg-white w-full mx-auto flex flex-col min-h-screen">
      <HeaderDemo variant="default" />
      <div className="container px-6 py-12 mx-auto flex items-center flex-col justify-center lg:gap-12">
        <div className="wf-ull lg:w-1/2">
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Something went wrong
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            There is no user with this username in our database
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <button
              onClick={reload}
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
            >
              <span>Refresh</span>
            </button>

            <Link
              href="/"
              className="w-1/2 px-5 py-2 text-center text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
            >
              Take me home
            </Link>
          </div>
        </div>

        <div className="relative w-full mt-8 lg:w-1/2 lg:mt-0">
          <Image
            className=" w-full lg:h-[32rem] h-80 md:h-96 rounded-lg object-cover "
            src={error}
            alt="error"
          />
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
