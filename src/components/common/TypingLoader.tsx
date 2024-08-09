import React from "react";
import { SyncLoader } from "react-spinners";
import Image from "next/image";

export default function TypingLoader() {
  return (
    <div className="flex gap-2 p-2">
      <div className="py-1 font-bold px-2 h-fit w-fit self-start bg-green-400 rounded-full ">AI</div>
      <div className="bg-gray-900 rounded-bl-[30px] rounded-tr-[30px] w-[160px] h-[60px] p-1 flex items-center justify-center relative border-2 border-gray-800 pt-3 pb-3">
        <SyncLoader
          color="#888888"
          margin={5}
          size={8}
          speedMultiplier={0.5}
        />
      </div>
    </div>
  );
}
