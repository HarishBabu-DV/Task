import React from 'react'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <main className='max-w-[1920px] w-full mx-auto'>
        <Outlet />
    </main>
  )
}

export default Layout