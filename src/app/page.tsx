import Input from "@/components/common/Input";
import Image from "next/image";
import { CgAttachment } from "react-icons/cg";

export default function Home() {
  return (

    <main className="  bg-[#333333]  ">
      <div className=" max-w-5xl mx-auto w-full min-h-screen flex flex-col justify-between ">
        
        <div className="h-2/3 flex-grow">
          
        </div>

        <div className="w-full  mb-4 flex items-center relative text-white ">
          <CgAttachment size={20} className="absolute left-4  "/>
          <Input type="text" className=" bg-[#4D4D4D] border-none focus:outline-none pl-12 py-3  placeholder:text-[#ececec] text-[#ececec]" />
        </div>

      </div>
    </main>
  );
}
