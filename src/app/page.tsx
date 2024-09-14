"use client";
import AIResponse from "@/components/chat/AIResponse";
import PdfUpload from "@/components/chat/FileUpload";
import UserText from "@/components/chat/UserText";
import Input from "@/components/common/Input";
import TypingLoader from "@/components/common/TypingLoader";
import { getMessages, getQuery, getQuestions } from "@/store/selectors/llmSelector";
import { openUploader } from "@/store/slices/fileSlice";
import { setQuery, startLLM } from "@/store/slices/languageModelSlice";
import { RootState } from "@/store/store";
import { FC } from "react";
import { CgAttachment } from "react-icons/cg";
import { connect, ConnectedProps } from "react-redux";

type P = {} & ReduxProps

const Home: FC<P> = ({ query, setQuery, startLLM, messages, questions, fileName, openUploader }) => {
  const handleKeyDown = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startLLM({query, fileName});
  };

  return (
    <main className="bg-[#333333]">
      <div className=" max-w-5xl mx-auto w-full min-h-screen flex flex-col justify-between px-4">
        <PdfUpload />

        <div className=" h-[65vh] flex-grow overflow-auto text-white flex flex-col ">
          {
            Object.keys(questions).map((key, index) => {
              return <div key={index} className="w-full flex flex-col gap-5 my-4">
                <UserText query={questions[key]} />
                {messages[key] ? <AIResponse message={messages[key]} /> : <TypingLoader />}
              </div>
            })
          }
        </div>

        <form className="w-full  mb-4 flex items-center relative text-white " onSubmit={handleKeyDown}>
          <CgAttachment  size={20} className="absolute left-4 cursor-pointer" onClick={()=>openUploader()} />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} type="text" className=" bg-[#4D4D4D] border-none focus:outline-none pl-12 py-3  placeholder:text-[#ececec] text-[#ececec]" />
        </form>
      </div>
    </main>
  );
}


const mapStateToProps = (state: RootState) => {
  return {
    query: getQuery(state),
    questions: getQuestions(state),
    messages: getMessages(state),
    fileName: state.file.fileName
  }
}
const mapDispatchToProps = { setQuery, startLLM , openUploader}

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(Home);