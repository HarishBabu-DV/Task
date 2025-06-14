import React from 'react'

const Posts = () => {
  const [posts,setPosts]=useState([])
  const tableHeadings=posts?.map(post=>Object.keys(post))
  const getPosts=async () => {
    try {
      
    } catch (error) {
      
    }
  }
  return (
    <section className='gradient-background '>
      <h1 className="text-center text-[2.5rem] font-bold max-md:text-[4rem] max-sm:text-[2.5rem] company-name">Posts</h1>
      <table>
        <thead>
        
        </thead>  
      </table>
    </section>
  )
}

export default Posts