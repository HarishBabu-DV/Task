import axios from "axios";

//Baseuri of Deployed API 
const API=axios.create({
    baseURL:import.meta.env.VITE_BASEURI
})

//API to store posts retrieved from json placeholder
//Used for testing purpose
const storePosts=async (listOfPosts)=>{
   return await API.post('/api/v1/posts/store',listOfPosts,{
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//API to Retrieve posts after storing posts
const retrievePosts=async ()=>{
   return await API.get('/api/v1/posts',{
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
//API to Create Post
const createPost=async (postData)=>{
   return await API.post('/api/v1/posts/add',postData,{
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
//API to Update Post
const updatePost=async (dataId,updatedData)=>{
   return await API.put(`/api/v1/posts/update/${dataId}`,updatedData,{
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
//API to Delete Post
const deletePost=async (dataId)=>{
   return await API.delete(`/api/v1/posts/delete/${dataId}`,{
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

//API to Delete all posts
//Used for testing purpose
const deletePosts=async () => {
   return await API.delete('/api/v1/posts/delete',{
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
export {storePosts,retrievePosts,createPost,updatePost,deletePost,deletePosts}