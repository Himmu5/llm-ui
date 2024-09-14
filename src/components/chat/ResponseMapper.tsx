import {FC} from 'react'
import UserText from './UserText'
import AIResponse from './AIResponse'
import TypingLoader from '../common/TypingLoader'
type P = {
    questions: ,
    messages: ,
}
const ResponseMapper:FC<P> =({ questions, messages })=>{
  return  <div className=" h-[65vh] flex-grow overflow-auto text-white flex flex-col ">
  {
    Object.keys(questions).map((key, index) => {
      return <div key={index} className="w-full flex flex-col gap-5 my-4">
        <UserText query={questions[key]} />
        {messages[key] ? <AIResponse message={messages[key]} /> : <TypingLoader />}
      </div>
    })
  }
</div>
}
export default ResponseMapper;