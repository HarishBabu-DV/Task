const posts=require('../models/posts')

//Store Posts from jsonplaceholder typicode
const storePosts=async (req,res) => {
    try {
        const postsToStore=req.body
        //create new post
        const storedPosts=await posts.insertMany(postsToStore)
        if(storedPosts){
            res.status(201).json({
                success:true,
                message:"Post stored successfully",
                data:storedPosts
            })
        } else{
             res.status(400).json({
                success:false,
                message:"Post storing process failed.Try again"
            })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal Server Error . Try again later"
        })
    }
} 

//Retrieve Posts
const retrievePosts=async (req,res) => {
    try {
        const postsList=await posts.find()
        if(postsList){
            res.status(200).json({
                success:true,
                message:"Posts fetched successfully",
                data:postsList
            })
        } else{
             res.status(404).json({
                success:false,
                message:"No Posts found."
            })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal Server Error . Try again later"
        })
    }
} 

//Add Posts

const addPosts=async (req,res) => {
    try {
        const {userId,title,body}=req.body
        //create new post
        const createdPost=await posts.create({
            userId,
            title,
            body
        })
        if(createdPost){
            res.status(201).json({
                success:true,
                message:"Post created successfully",
                data:createdPost
            })
        } else{
             res.status(400).json({
                success:false,
                message:"Post creation failed.Try again"
            })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal Server Error . Try again later"
        })
    }
} 

//Update Post
const updatePost=async (req,res) => {
    try {
        const updatedPostData=req.body;
        const postId=req.params.id;
        const updatedPost=await posts.findByIdAndUpdate(postId,updatedPostData,{ new:true})
        if(updatedPost){
            res.status(201).json({
                success:true,
                message:"Post updated successfully",
                data:updatedPost
            })
        }
        else{
            res.status(404).json({
                success:false,
                message:"Post not found in collection"
            })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal Server Error, Try again",
        })
    }
} 

//Delete Post
const deletePost = async (req,res) => {
    try {
        const postId=req.params.id;
        const deletedPost=await posts.findByIdAndDelete(postId);
        if(deletedPost){
            res.status(200).json({
                success:true,
                message:"Post deleted successfully",
                data:deletedPost
            })
        } else{
            res.status(404).json({
                success:false,
                message:"Post not found with requested ID"
            })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal Server Error, Try again",
        })
    }
} 

module.exports={storePosts,retrievePosts,addPosts,updatePost,deletePost}