import axios from "axios";

const API=axios.create({
    baseURL:'https://mern-stack-task-xo7j.onrender.com'
})
//Store posts retrieved from json placeholder
const storePosts=async (listOfPosts)=>{
   return await API.post('/api/v1/posts/store',listOfPosts,{
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
//Retrieve posts
const retrievePosts=async ()=>{
   return await API.get('/api/v1/posts');
}
//Create Post
const createPost=async ()=>{
   return await API.post('/api/v1/posts/add');
}
//Update Post
const updatePost=async ()=>{
   return await API.put('/api/v1/posts/update/:id');
}
//Delete Post
const deletePost=async ()=>{
   return await API.put('/api/v1/posts/delete/:id');
}

export {storePosts,retrievePosts,createPost,updatePost,deletePost}