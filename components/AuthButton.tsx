import React,{forwardRef} from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{}

const AuthButton = forwardRef<HTMLButtonElement,Props>(({
  className,
  children,
  disabled,
  onClick,
  ...props
},ref)=>{
  return (
    <button ref={ref} className={twMerge(`hover:opacity-70 hover:-translate-y-1 text-sm rounded-full duration-300 py-2 px-5 text-neutral-300`,!disabled&&'bg-white text-black font-semibold',disabled&&'hover:bg-black hover:text-white',className)} onClick={onClick} >
      {children}
    </button>
  )
})

export default AuthButton
