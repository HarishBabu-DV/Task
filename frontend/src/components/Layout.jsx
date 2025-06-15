
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    // To create a layout of max width 1920px 
    <main className='max-w-[1920px] w-full mx-auto'>
        <Outlet />
    </main>
  )
}

export default Layout