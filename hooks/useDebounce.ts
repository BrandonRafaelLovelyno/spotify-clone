import { useEffect, useState } from "react";

const useDebounce =<T>(value:T,delay:number=500):T => {
    const [debounceValue,setDebounceValue]=useState<T>(value)
        useEffect(()=>{
        const timeout=setTimeout(()=>setDebounceValue(value),delay)
        return ()=>clearTimeout(timeout)
    },[value])

    return debounceValue;

}

export default useDebounce
