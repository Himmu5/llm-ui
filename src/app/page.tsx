"use client";
import Input from "@/components/common/Input";
import { getQuery } from "@/store/selectors/llmSelector";
import { setQuery, startLLM } from "@/store/slices/languageModelSlice";
import { RootState } from "@/store/store";
import { FC } from "react";
import { CgAttachment } from "react-icons/cg";
import { connect, ConnectedProps } from "react-redux";

type P = {} & ReduxProps

const Home: FC<P> = ({ query, setQuery, startLLM }) => {
  const handleKeyDown = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startLLM(query);
  };

  return (
    <main className="bg-[#333333]">
      <div className="  max-w-5xl mx-auto w-full min-h-screen flex flex-col justify-between px-4">

        <div className=" h-2/3 flex-grow overflow-auto ">

        </div>

        <form className="w-full  mb-4 flex items-center relative text-white " onSubmit={handleKeyDown}>
          <CgAttachment size={20} className="absolute left-4  " />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} type="text" className=" bg-[#4D4D4D] border-none focus:outline-none pl-12 py-3  placeholder:text-[#ececec] text-[#ececec]" />
        </form>
      </div>
    </main>
  );
}


const mapStateToProps = (state: RootState) => {
  return {
    query: getQuery(state)
  }
}
const mapDispatchToProps = { setQuery, startLLM }

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(Home);