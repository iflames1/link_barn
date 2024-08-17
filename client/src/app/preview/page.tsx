import Preview from "@/components/preview/preview";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <div className="w-full md:p-6">
        <div className="flex justify-between items-center gap-4 px-6 py-4 md:p-6">
          <Link
            href={"/links"}
            className="hS py-[11px] px-[27px] border-[1px] hover:bg-base-light text-base-dark border-base-dark rounded-lg"
          >
            Back to Editor
          </Link>
          <div className="hS py-[11px] px-[27px] bg-base-dark text-white  rounded-lg cursor-pointer">
            Share Link
          </div>
        </div>
      </div>
      <div className="w-full max-w-[1440px] flex items-center mx-auto relative">
        <Preview />
      </div>
    </div>
  );
}
