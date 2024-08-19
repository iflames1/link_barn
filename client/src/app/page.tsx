import Header from "@/components/header";

export default function Home() {
  return (
    <div
      className="bg-gray-light sm:p-6 w-full max-w-[1440px] mx-auto"
      suppressHydrationWarning
    >
      <Header />
      {/* <div className="sm:p-0 p-4 bg-white">Yooo</div> */}
    </div>
  );
}
