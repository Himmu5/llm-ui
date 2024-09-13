import { FC } from 'react'
import CustomMarkdown from '../common/CustomMarkdown'

type P = {
    message: string
}

const AIResponse: FC<P> = ({ message }) => {
    return <div className="flex gap-4">
        <div className="mt-3 py-1 font-bold px-2 h-fit w-fit self-start bg-green-400 rounded-full ">AI</div>
        <div className=" bg-gray-800 rounded-lg p-4 w-full">
            <CustomMarkdown markdownContent={message} />
        </div>
    </div>
}
export default AIResponse;