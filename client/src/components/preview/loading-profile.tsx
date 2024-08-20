export default function LoadingProfile() {
  return (
    <div className="flex flex-col items-center gap-[25px] animate-pulse">
      <div className="bg-gray-preview size-24 rounded-full"></div>
      <div className="flex flex-col items-center gap-[13px]">
        <div className="bg-gray-preview w-40 h-4 rounded-full"></div>
        <div className="bg-gray-preview w-32 h-4 rounded-full"></div>
      </div>
    </div>
  );
}
