import { Route, Routes } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Posts from './pages/Posts'
import { Toaster } from 'sonner'

const App = () => {
  return (
    <>
      {/* Components for Message Alerts */}
      <Toaster position='top-center' richColors />
      <Routes>
        <Route element={<Layout />}>
          {/* Home Page  */}
          <Route path='/' element={<Home />} />
          {/* Posts Page  */}
          <Route path='/posts' element={<Posts />} />
        </Route>
      </Routes>
    </>
  )
}

export default App