import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Posts = () => {
  const [posts,setPosts]=useState([])
  //Initially used jsonplaceholder api to fetch data
  const getPosts=async () => {
    try {
      const response=await axios.get('https://jsonplaceholder.typicode.com/posts')
      if(response){
        console.log('posts received');
        setPosts(response?.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(posts);
  const tableHeadings=Object.keys(posts[0])
  console.log(tableHeadings);
   
  useEffect(()=>{
    getPosts()
  },[])
  return (
    <section className='gradient-background '>
      <h1 className="text-center text-[2.5rem] font-bold max-md:text-[4rem] max-sm:text-[2.5rem] company-name">Posts</h1>
      <table>
        <thead>
        {
         tableHeadings?.map(tableHeading=>(
          <th>{tableHeading}</th>
         ))
        }
        </thead>  
        <tbody>
          {
            posts && posts.map(post=>(
              <tr>
                <td>{post.userId}</td>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </section>
  )
}

export default Posts