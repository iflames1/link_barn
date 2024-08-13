import Image from "next/image";

export default function GetStarted() {
  return (
    <div className="flex flex-col items-center justify-center p-5 min-h-[calc(100vh-518px)] max-h-[469px] sm:gap-10 gap-6 bg-gray-light rounded-xl">
      <Image
        src="/images/get-started.svg"
        alt="get started image"
        width={250}
        height={160}
      />
      <div className="text-center max-w-[488px]">
        <h3 className="pb-6 hM text-black">Let’s get you started</h3>
        <p className="bM text-gray-dark">
          Use the “Add new link” button to get started. Once you have more than
          one link, you can reorder and edit them. We’re here to help you share
          your profiles with everyone!
        </p>
      </div>
    </div>
  );
}
