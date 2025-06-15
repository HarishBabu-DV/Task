import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { storePosts } from '../services/api/ApiServices'

const Posts = () => {
  const [recievedPosts,setRecievedPosts]=useState([])
  const [posts,setPosts]=useState([])
  const [loading,setLoading]=useState(false)
  //Initially used jsonplaceholder api to fetch data
  const receivePosts=async () => {
    try {
      setLoading(true)
      const response=await axios.get('https://jsonplaceholder.typicode.com/posts')
      if(response?.data){
        console.log('posts received');
        setRecievedPosts(response?.data)
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  const storeNewPosts=async () => {
    try {
      const response=await storePosts(receivePosts)
      if(response){
        console.log('posts stored');
        setPosts(response?.data?.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  // console.log(posts);
  // const tableHeadings=Object.keys(posts[0])
  // console.log(tableHeadings);
  console.log("posts :",posts);
  useEffect(()=>{
    receivePosts()
  },[])
  
  console.log(recievedPosts);
  return (
    <section className='gradient-background '>
      <h1 className="text-center text-[2.5rem] font-bold max-md:text-[4rem] max-sm:text-[2.5rem] company-name">Posts</h1>
      {
        loading ? <h1>Loading</h1> : null
      }
      <table>
        <thead>
        {/* {
         tableHeadings?.map(tableHeading=>(
          <th>{tableHeading}</th>
         ))
        } */}
        </thead>  
        <tbody>
          {/* {
            posts && posts?.map(post=>(
              <tr>
                <td>{post.userId}</td>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
              </tr>
            ))
          } */}
        </tbody>
      </table>
      <button onClick={()=>storeNewPosts()} className='bg-black text-white py-1.5 px-4 hover:cursor-pointer'>store posts</button>
    </section>
  )
}

export default Posts