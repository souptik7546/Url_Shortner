import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'

export const Layout = () => {
  return (
    <div>
        <main className='min-h-screen mx-8'>
         <Header/>
        <Outlet/>   
        </main>
        
        <div className='p-10 text-center bg-gray-800 mt-10'>
            Build with ❤️ by Souptik
        </div>
        
    </div>
  )
}
