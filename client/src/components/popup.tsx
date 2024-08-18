"use client";
import { useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { GiCheckMark } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

interface PopupProps {
  status: boolean;
  message: string;
  setShowPopup: (show: boolean) => void;
}
export default function Popup({ status, message, setShowPopup }: PopupProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [setShowPopup]);

  return (
    <div
      onClick={() => setShowPopup(false)}
      className="fixed inset-0 z-30 bg-black text-black bg-opacity-50 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-[400px] max-h-[400px] w-[90%] m-auto h-fit bg-white rounded-lg flex flex-col items-center justify-center gap-10 p-10"
      >
        <div>
          {status ? (
            <GiCheckMark className="md:size-32 size-20 text-green-500" />
          ) : (
            <RxCross2 className="md:size-32 size-20 text-red" />
          )}
        </div>
        <p className="md:text-3xl text-xl text-center">{message}</p>
      </div>
    </div>
  );
}
