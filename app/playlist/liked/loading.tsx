"use client"

import React from 'react'
import {BounceLoader} from 'react-spinners'

const Loading = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <BounceLoader color='#22c55e' size={40}/>
    </div>
  )
}

export default Loading
