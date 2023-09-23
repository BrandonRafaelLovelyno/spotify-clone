"use client"

import React from 'react'

import { Toaster } from 'react-hot-toast'

const ToastProvider = () => {
  return (
    <Toaster
    toastOptions={{
      success:{
        iconTheme:{
          primary:'black',
          secondary:'green',
        }
      },
      error:{
        iconTheme:{
          primary:'black',
          secondary:'red',
        }
      },
        style: {
          background: '#00e673',
          color: '#000',
          fontWeight:'bold',
        },
      }}
    />
  )
}

export default ToastProvider
