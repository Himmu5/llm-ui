import { FC, InputHTMLAttributes } from 'react'

type P = {} & InputHTMLAttributes<HTMLInputElement>

const Input:FC<P> =({ className , ...rest })=>{
  return <input {...rest} placeholder='Enter your query' className={' rounded-3xl w-full '+className} />
}
export default Input;