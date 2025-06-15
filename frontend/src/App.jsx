import React from 'react'
import { Route, Routes } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Posts from './pages/Posts'
import { Toaster } from 'sonner'

const App = () => {
  return (
    <>
    
      <Toaster position='top-center' richColors />
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/posts' element={<Posts />} />
        </Route>
      </Routes>
    </>
  )
}

export default App