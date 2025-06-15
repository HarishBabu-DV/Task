import { useEffect, useState } from 'react'
import axios from 'axios'
import { createPost, deletePost, deletePosts, retrievePosts, storePosts, updatePost } from '../services/api/ApiServices'
import { toast } from 'sonner'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdAddCircle } from "react-icons/md";
import Button from '../components/Button';
import Skeleton from '../components/Skeleton';
const Posts = () => {
  // state to store received posts from json placeholder 
  const [recievedPosts, setRecievedPosts] = useState([])
  // state to store posts received from mongodb
  const [posts, setPosts] = useState([])
  const tableHeadings = ['userId', 'id', 'title', 'body', 'actions']
  const [isEdit, setIsEdit] = useState(false)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteAlertVisible, setIsDeleteAlertVisible] = useState(false)
  const [isButtonLoading, setIsButtonLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState('')
  const [newPost, setNewPost] = useState({
    userId: '',
    title: '',
    body: ''
  })
  //Function to handle onChange event of input fields
  const handleOnChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value
    })
  }

  //Initially used jsonplaceholder api to fetch data
  //Used for testing purpose
  const receivePostsFromJsonPlaceholder = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
      if (response?.data) {
        setRecievedPosts(response?.data)
        toast.success('Posts received successfully')
      }
    } catch (error) {
      toast.error("Can't fetch data")
    }
  }

  // API method to store posts retrieved from jsonplaceholder 
  //Used for testing purpose
  const storeNewPosts = async () => {
    try {
      const response = await storePosts(recievedPosts)
      if (response) {
        setPosts(response?.data)
        toast.success('Posts stored successfully')
      }
    } catch (error) {
      toast.error("Can't store data")
    }
  }

  //API method to delete all posts
  //Used for testing purpose
  const deleteAllPosts = async () => {
    const response = await deletePosts();
    try {
      if (response) {
        toast.success('Posts deleted successfully')
      }
    } catch (error) {
      toast.error('Unable to delete')
    }
  }

  //API method to retrieve all posts from MongoDB
  const getPosts = async () => {
    try {
      const response = await retrievePosts();
      if (response) {
        setPosts(response?.data?.data)
        setIsLoading(false)
      } else {
        toast.error('Something went wrong')
      }

    } catch (error) {
      toast.error("Can/'t fetch posts  ")
    }
  }
  //API method to create post from MongoDB
  const addPost = async (postData) => {
    try {
      setIsButtonLoading(true)
      const response = await createPost(postData)
      if (response) {
        const { success } = response?.data
        if (success) {
          toast.success("Post added successfully")
          setNewPost({
            userId: '',
            title: '',
            body: ''
          })
          getPosts()
          setIsButtonLoading(false)
          setIsFormVisible(false)
        }
      }
      else {
        toast.error('Something went wrong. Try again`')
        setIsButtonLoading(false)
      }
    } catch (error) {
      setIsButtonLoading(false)
      toast.error('Post creation failed');
    }
  }
  //API method to update a post from MongoDB
  const handleupdatePost = async (postId, updatedPostData) => {
    try {
      setIsButtonLoading(true)
      const response = await updatePost(postId, updatedPostData)
      if (response) {
        const { success } = response?.data
        if (success) {
          toast.success("Post updated successfully")
          setNewPost({
            userId: '',
            title: '',
            body: ''
          })
          getPosts()
          setIsEdit(false);
          setIsButtonLoading(false)
          setIsFormVisible(false)

        }
      }
      else {
        toast.error('Something went wrong. Try again`')
        setIsButtonLoading(false)
      }
    } catch (error) {
      setIsButtonLoading(false)
      toast.error('Post creation failed');
    }
  }

  //API method to delete a post from MongoDB
  const handleDeletePost = async (postId) => {
    try {
      const response = await deletePost(postId)
      if (response) {
        const { success } = response?.data
        if (success) {
          toast.success("Post deleted successfully")
          getPosts()
        }
      }
      else {
        toast.error('Something went wrong. Try again`')
      }
    } catch (error) {
      toast.error('Post deletion failed');
    }
  }

  useEffect(() => {
    setIsLoading(true)
    //To fetch posts on page load
    getPosts()
  }, [])

  return (
    <>
      { 
        isLoading ? (
          // Skeleton animation will run while loading 
          <div className='gradient-background w-full h-screen flex flex-col items-center justify-center gap-20'>
            <Skeleton className={'w-[600px] h-[50px] max-sm:w-[300px]'} />
            <Skeleton className={'w-[600px] h-[300px] max-sm:w-[300px]'} />
          </div>
        )
          :
          (
            // Posts data will load after finished loading 
            <section className={`gradient-background px-4 md:px-10 relative w-full`}>
              <div className={`${isFormVisible || isDeleteAlertVisible ? `opacity-50 blur-[5px] ` : null}`}>
                {/* Posts Heading  */}
                <h1 className="text-center text-[2.5rem] font-bold max-md:text-[4rem] max-sm:text-[2.5rem] company-name">
                  Posts
                </h1>
                {/* Create new Post Icon  */}
                <div className='flex justify-end py-4 cursor-pointer'>
                  <MdAddCircle className='text-[3rem]' onClick={() => setIsFormVisible(true)} />
                </div>
                {/* Posts table  */}
                <div className='h-[80vh] overflow-y-scroll shadow-[0_0_12px_#bababa]'>
                  <table className='bg-white border-collapse  w-full max-md:w-max'>
                    {/* Table Headings  */}
                    <thead className='bg-[#3b3b3b] sticky top-0 z-30'>
                      <tr>
                        {
                          tableHeadings?.map((tableHeading, index) => (
                            <th className='capitalize p-3 text-white text-left' key={index}>
                              {tableHeading}</th>
                          ))
                        }
                      </tr>
                    </thead>
                    {/* Table Body  */}
                    <tbody>
                      { 
                        //Renders the table data if the posts contain data and if it is an array
                        posts && Array.isArray(posts) ? posts.map((eachPost, index) => (
                          <tr className='border-y-[1px] border-gray-400' key={index}>
                            {/* User Id data  */}
                            <td className='table-data'>{eachPost.userId}</td>
                            {/* Id data  */}
                            <td className='table-data'>{eachPost.id}</td>
                            {/* Title data  */}
                            <td className='table-data text-left'>{eachPost.title}</td>
                            {/* Body data  */}
                            <td className='table-data text-left'>{eachPost.body}</td>
                            {/* Actions data  */}
                            <td className='px-3 py-1.5 text-center flex justify-center items-center gap-2'>
                                {/* Edit icon  */}
                              <FaEdit className='text-[1.7rem] cursor-pointer text-blue-500' onClick={() => {
                                setSelectedIndex(Number(index))
                                setIsEdit(true)
                                setIsFormVisible(true)

                              }} />
                               {/* Delete icon  */}
                              <MdDelete className='text-[1.7rem] cursor-pointer text-red-400' onClick={
                                () => {
                                  setSelectedIndex(Number(index))
                                  setIsDeleteAlertVisible(true)
                                }
                              } />
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
                // Renders only when clicked create or edit post button 
                isFormVisible && (
                  <form action="" className='dialog-component-container'>
                    <h2 className='text-[1.5rem] font-bold'>{isEdit ? 'Edit' : 'Create'} Post</h2>
                    {/* User Id field  */}
                    <div className='flex flex-col gap-1.5'>
                      <label className='label-component' htmlFor="userid">userId</label>
                      <input className='input-component' type="text" placeholder='Enter user Id' name='userid' id='userid' value={newPost.userId} onChange={(e) => setNewPost({
                        ...newPost,
                        userId: Number(e.target.value)
                      })} />
                    </div>
                    {/* Title field  */}
                    <div className='flex flex-col gap-1.5'>
                      <label className='label-component' htmlFor="title">Title</label>
                      <input className='input-component' type="text" placeholder='Enter Title' name='title' id='title' value={newPost.title} onChange={handleOnChange} />
                    </div>
                    {/* Body field  */}
                    <div className='flex flex-col gap-1.5'>
                      <label className='label-component' htmlFor="body">Body</label>
                      <input className='input-component' type="text" placeholder='Enter Body' name='body' id='body' value={newPost.body} onChange={handleOnChange} />
                    </div>
                    <div className='flex justify-around gap-4'>
                      {/* Cancel button  */}
                      <Button className={'bg-gray-200 cursor-pointer text-black text-lg w-1/2 px-6 py-2 rounded-[5px] shadow-[0_0_5px_#000] max-sm:text-[0.95rem]'} onClick={() => setIsFormVisible(!isFormVisible)}>
                        Cancel
                      </Button>
                      {/* Create or Update button  */}
                      <Button className={'bg-black text-white w-1/2 text-lg px-6 py-2 rounded-[5px] disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed cursor-pointer max-sm:text-[0.95rem]'} onClick={() => isEdit ? handleupdatePost(posts[selectedIndex]?._id, {
                        userId: newPost.userId,
                        title: newPost.title,
                        body: newPost.body,
                        id: posts[selectedIndex].id,
                        _id: posts[selectedIndex]._id,
                        _v: posts[selectedIndex]._v
                      }) : addPost(newPost)} disabled={isButtonLoading ? true : false}>
                        {isEdit ? 'Update' : 'Create'}
                      </Button>
                    </div>
                  </form>
                )
              }

              {/* Delete Confirmation message  */}
              {
                // Renders only when clicked delete button 
                isDeleteAlertVisible && (
                  <div className='dialog-component-container'>
                    {/* Confirmation message  */}
                    <p>Are You sure want to Delete this post ?</p>
                    <div className='flex justify-around gap-5'>
                      {/* Cancel button  */}
                      <Button className={'bg-gray-200 cursor-pointer text-black text-lg w-1/2 px-6 py-2 rounded-[5px] shadow-[0_0_5px_#000]'} onClick={() => setIsDeleteAlertVisible(false)}>
                        Cancel
                      </Button>
                      {/* Delete button  */}
                      <Button className={'bg-black text-white cursor-pointer text-lg w-1/2 px-6 py-2 rounded-[5px] '} onClick={() => {
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
          )}

    </>

  )
}

export default Posts