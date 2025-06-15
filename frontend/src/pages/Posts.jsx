import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { createPost, deletePost, deletePosts, retrievePosts, storePosts, updatePost } from '../services/api/ApiServices'
import { toast } from 'sonner'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdAddCircle } from "react-icons/md";
import Button from '../components/Button';
import Skeleton from '../components/Skeleton';
const Posts = () => {
  const [recievedPosts,setRecievedPosts]=useState([])
  const [posts,setPosts]=useState([])
  const tableHeadings=['userId','id','title','body','actions']
  const [isEdit,setIsEdit]=useState(false)
  const [isFormVisible,setIsFormVisible]=useState(false)
  const [isLoading,setIsLoading]=useState(false)
  const [isDeleteAlertVisible,setIsDeleteAlertVisible]=useState(false)
  const [isButtonLoading,setIsButtonLoading]=useState(false)
  const [selectedIndex,setSelectedIndex]=useState('')
  const [newPost,setNewPost]=useState({
    userId:'',
    title:'',
    body:''    
  })

  const handleOnChange=(e)=>{
    setNewPost({
      ...newPost,
      [e.target.name]:e.target.value
    })
  }

  //Initially used jsonplaceholder api to fetch data
  const receivePostsFromJsonPlaceholder=async () => {
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

// API method to store posts retrieved from jsonplaceholder 
  const storeNewPosts=async () => {
    try {
      const response=await storePosts(recievedPosts)
      if(response){
        console.log('posts stored');
        setPosts(response?.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  //API method to delete all posts
  const deleteAllPosts=async () => {
    const response=await deletePosts();
    try {
       if(response){
        console.log('posts deleted');
      }
    } catch (error) {
      console.log(error);
      
    }
   
  }

  //API method to get all posts from MongoDB
  const getPosts=async () => {
    try {
      const response=await retrievePosts();
      console.log(response);
      if(response){
        console.log('posts received');
        setPosts(response?.data?.data)
        setIsLoading(false)
      } else{
        toast.error('Something went wrong')
      }

    } catch (error) {
        console.log(error);
        toast.error("Can/'t fetch posts  ")
    }
  }
   //API method to create post from MongoDB
   const addPost=async (postData) => {
      try {
        setIsButtonLoading(true)
        const response=await createPost(postData)
        if(response){
          const {success}=response?.data
          if(success){
            toast.success("Post added successfully")
            setNewPost({
               userId:'',
                title:'',
                body:''  
            })
            getPosts()
            setIsButtonLoading(false)
            setIsFormVisible(false)
          }
        }
        else{
          toast.error('Something went wrong. Try again`')
          setIsButtonLoading(false)
        }
      } catch (error) {
        console.log(error);
        setIsButtonLoading(false)
        toast.error('Post creation failed');
      }
   }
   //API method to update a post from MongoDB
   const handleupdatePost=async (postId,updatedPostData) => {
      try {
          setIsButtonLoading(true)
        const response=await updatePost(postId,updatedPostData)
        if(response){
          const {success}=response?.data
          if(success){
            toast.success("Post updated successfully")
            setNewPost({
               userId:'',
                title:'',
                body:''  
            })
            getPosts()
            setIsEdit(false);
            setIsButtonLoading(false)
            setIsFormVisible(false)

          }
        }
        else{
          toast.error('Something went wrong. Try again`')
          setIsButtonLoading(false)
        }
      } catch (error) {
        console.log(error);
        setIsButtonLoading(false)
        toast.error('Post creation failed');
      }
   }
   
   //API method to delete a post from MongoDB
   const handleDeletePost=async (postId) => {
    try {
        const response=await deletePost(postId)
        if(response){
          const {success}=response?.data
          if(success){
            toast.success("Post deleted successfully")
            getPosts()
          }
        }
        else{
          toast.error('Something went wrong. Try again`')
        }
      } catch (error) {
        console.log(error);
        toast.error('Post deletion failed');
      }
   }


  useEffect(()=>{
    setIsLoading(true)
    getPosts()
  },[])
  console.log(recievedPosts);
  console.log(tableHeadings);
  console.log("posts :",posts);
  console.log(newPost);
  
  return (
    <>
      {
            isLoading ? (
              <div className='gradient-background w-full h-screen flex flex-col items-center justify-center gap-20'>
                <Skeleton className={'w-[600px] h-[50px] max-sm:w-[300px]'}/>
                <Skeleton className={'w-[600px] h-[300px] max-sm:w-[300px]'}/>
              </div>
              )
             :
            (
          <section className={`gradient-background px-4 md:px-10 relative w-full`}>
            
            <div className={`${isFormVisible || isDeleteAlertVisible ? `opacity-50 blur-[5px] `:null}`}>
              <h1 className="text-center text-[2.5rem] font-bold max-md:text-[4rem] max-sm:text-[2.5rem] company-name">
                Posts
              </h1>
              <div className='flex justify-end py-4 cursor-pointer'>
                <MdAddCircle className='text-[3rem]' onClick={()=>setIsFormVisible(true)}/>
              </div>
                <div className='h-[80vh] overflow-y-scroll shadow-[0_0_12px_#bababa]'>
                  <table className='bg-white border-collapse  w-full max-md:w-max'>
                    <thead className='bg-[#3b3b3b] sticky top-0 z-30'>
                      <tr>
                        {
                          tableHeadings?.map((tableHeading,index)=>(
                            <th className='capitalize p-3 text-white text-left' key={index}>
                              {tableHeading}</th>
                          ))
                        }
                      </tr>
                    </thead>  
                    <tbody>
                      { 
                        posts && Array.isArray(posts) ? posts.map((eachPost,index) => (
                          <tr className='border-y-[1px] border-gray-400' key={index}>
                            <td className='table-data'>{eachPost.userId}</td>
                            <td className='table-data'>{eachPost.id}</td>
                            <td className='table-data text-left'>{eachPost.title}</td>
                            <td className='table-data text-left'>{eachPost.body}</td>
                            <td className='px-3 py-1.5 text-center flex justify-center items-center gap-2'>
                              <FaEdit className='text-[1.7rem] cursor-pointer text-blue-500' onClick={()=>{
                                setSelectedIndex(Number(index))
                                setIsEdit(true)
                                setIsFormVisible(true)
                                
                              }}/>
                              <MdDelete className='text-[1.7rem] cursor-pointer text-red-400' onClick={
                                ()=>{
                                setSelectedIndex(Number(index))
                                setIsDeleteAlertVisible(true)
                                }
                              }/>
                            </td>
                          </tr>
                        )) : null
                      }
                    </tbody>
                  </table>
                </div>
            </div>
         
            {/* Form to create or edit the posts */}
            {
              isFormVisible && (
              <form action="" className='dialog-component-container'>
                <h2 className='text-[1.5rem] font-bold'>{isEdit ? 'Edit': 'Create'} Post</h2>
                <div className='flex flex-col gap-1.5'>
                    <label className='label-component' htmlFor="userid">userId</label>
                    <input className='input-component'  type="text" placeholder='Enter user Id' name='userid' id='userid' value={newPost.userId} onChange={(e)=>setNewPost({
                      ...newPost,
                      userId:Number(e.target.value)
                    })}/>
                </div>
                <div className='flex flex-col gap-1.5'>
                    <label className='label-component' htmlFor="title">Title</label>
                    <input className='input-component'  type="text" placeholder='Enter Title' name='title' id='title' value={ newPost.title} onChange={handleOnChange}/>
                </div>
                <div className='flex flex-col gap-1.5'>
                    <label className='label-component' htmlFor="body">Body</label>
                    <input className='input-component'  type="text" placeholder='Enter Body' name='body' id='body' value={newPost.body} onChange={handleOnChange}/>
                </div>
                <div className='flex justify-around gap-4'>
                  <Button className={'bg-gray-200 cursor-pointer text-black text-lg w-1/2 px-6 py-2 rounded-[5px] shadow-[0_0_5px_#000] max-sm:text-[0.95rem]'} onClick={()=>setIsFormVisible(!isFormVisible)}>
                    Cancel
                  </Button>
                  <Button className={'bg-black text-white w-1/2 text-lg px-6 py-2 rounded-[5px] disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed cursor-pointer max-sm:text-[0.95rem]'} onClick={()=>isEdit ? handleupdatePost(posts[selectedIndex]?._id,{
                    userId:newPost.userId,
                    title:newPost.title,
                    body:newPost.body,
                    id:posts[selectedIndex].id,
                    _id:posts[selectedIndex]._id,
                    _v:posts[selectedIndex]._v
                  }) : addPost(newPost)} disabled={isButtonLoading ? true : false}>
                    {isEdit ? 'Update' : 'Create'}  
                  </Button> 
                </div>
            </form>
              )
            }

            {/* Delete Confirmation message  */}
            {
              isDeleteAlertVisible && (
                <div className='dialog-component-container'>
                  <p>Are You sure want to Delete this post ?</p>
                  <div className='flex justify-around gap-5'>
                  <Button className={'bg-gray-200 cursor-pointer text-black text-lg w-1/2 px-6 py-2 rounded-[5px] shadow-[0_0_5px_#000]'} onClick={()=>setIsDeleteAlertVisible(false)}>
                    Cancel
                  </Button>
                  <Button className={'bg-black text-white cursor-pointer text-lg w-1/2 px-6 py-2 rounded-[5px] '} onClick={()=>{
                    handleDeletePost(posts[selectedIndex]?._id)
                    setIsDeleteAlertVisible(false)
                  }
                  }>
                    Delete
                  </Button>
                  </div>
                </div>
              )
            }
          </section>
           ) }
      
    </>

  )
}

export default Posts