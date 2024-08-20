export default function LoadingForm() {
  return (
    <div className="flex flex-col items-center justify-center p-5 min-h-[calc(100vh-518px)] max-h-[469px] sm:gap-10 gap-6 bg-gray-preview rounded-xl">
      <div className="w-[250px] h-[160px] bg-gray-preview animate-pulse rounded-lg" />
      <div className="text-center max-w-[488px] w-full">
        <div className="h-8 bg-gray-preview rounded-lg mb-6" />
        <div className="h-4 bg-gray-preview rounded-lg mb-2" />
        <div className="h-4 bg-gray-preview rounded-lg mb-2" />
        <div className="h-4 bg-gray-preview rounded-lg" />
      </div>
    </div>
  );
}
