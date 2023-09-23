"use client"

import { useRouter } from 'next/navigation'
import qs from 'query-string'
import useDebounce from '@/hooks/useDebounce'
import React,{useState,useEffect,ChangeEvent} from 'react'
import Input from './Input'

const SearchInput = () => {
    const [input,setInput]=useState<string>("")
    const debouncedValue=useDebounce<string>(input,500)
    const router=useRouter()
    const onChange=(event:ChangeEvent<HTMLInputElement>)=>{
        setInput(event.target.value as string)
    }
    useEffect(()=>{
        const query={
            title:debouncedValue
        }
        const url=qs.stringifyUrl({
            url:'http://localhost:3000/search',
            query:query
        })
        router.push(url)
    },[debouncedValue])

  return (
    <Input 
    value={input} 
    onChange={onChange}
    className="focus:-translate-y-1 focus:px-5 px-3 focus:placeholder:px-0"
    placeholder='Enter song title'
    />
  )
}

export default SearchInput
