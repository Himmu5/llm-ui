import { FC, memo } from 'react'

type P = {
    query: string
}

const UserText: FC<P> = ({ query }) => {
    return <div className=" bg-gray-800 rounded-lg p-4 self-end">
        {query}
    </div>
}
export default memo(UserText);