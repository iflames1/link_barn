import Image from "next/image";

export default function LinkForm() {
  return (
    <div className="bg-white rounded-xl">
      <div className="sm:p-10 p-6">
        <div className="pb-6">
          <h2 className="hM text-black pb-2">Customize your links</h2>
          <p className="bM text-gray-dark pb-10">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
          <button className="hS text-base-dark border-[1px] border-base-dark hover:bg-base-light py-[11px] px-7 rounded-lg w-full">
            + Add new link
          </button>
        </div>
        <div className="flex flex-col items-center p-5 sm:py-32 sm:gap-10 gap-6 bg-gray-light rounded-xl">
          <Image
            src="/images/get-started.svg"
            alt="get started image"
            width={250}
            height={160}
          />
          <div className="text-center">
            <h3 className="pb-6 hM text-black">Let’s get you started</h3>
            <p className="bM text-gray-dark">
              Use the “Add new link” button to get started. Once you have more
              than one link, you can reorder and edit them. We’re here to help
              you share your profiles with everyone!
            </p>
          </div>
        </div>
      </div>
      <hr className="h-[1px] bg-gray border-none" />
      <div className="sm:py-6 sm:px-10 p-4 flex justify-end">
        <button className="hS button text-white bg-base-dark opacity-25 sm:w-fit w-full">
          Save
        </button>
      </div>
    </div>
  );
}
