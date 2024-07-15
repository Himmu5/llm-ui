import { FC, InputHTMLAttributes } from 'react'

type P = {} & InputHTMLAttributes<HTMLInputElement>

const Input:FC<P> =({ className , ...rest })=>{
  return <input {...rest} placeholder='Enter your query' className={' px-4 py-2 rounded-sm w-full '+className} />
}
export default Input;