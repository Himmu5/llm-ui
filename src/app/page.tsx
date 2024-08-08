"use client";
import Input from "@/components/common/Input";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useState } from "react";
import { CgAttachment } from "react-icons/cg";

export default function Home() {
  const [message, setMessage] = useState('');
  const llmStream = async () => {
    await fetchEventSource('http://localhost:8000/chat?query=hey', {
      onmessage(ev) {
        setMessage((pre) => pre + ev.data);
      }
    });
  }

  return (
    <div className=" bg-[#333333] max-w-5xl mx-auto w-full min-h-screen flex flex-col justify-between px-4">

      <div className=" h-2/3 flex-grow overflow-auto">
        {message}
      </div>

      <div className="w-full  mb-4 flex items-center relative text-white ">
        <CgAttachment size={20} className="absolute left-4  " />
        <Input type="text" className=" bg-[#4D4D4D] border-none focus:outline-none pl-12 py-3  placeholder:text-[#ececec] text-[#ececec]" />
      <button onClick={llmStream} className="w-full bg-[#FFA800] text-white py-3 rounded-lg">Start LLM</button>
      </div>
    </div>
  );
}
