const express=require('express')
const router=express.Router()
const {storePosts,retrievePosts,addPosts,updatePost,deletePost,deletePosts}=require('../controllers/postsController')

//POST Request to store posts 
router.post('/store',storePosts)
//GET Request to retrieve posts 
router.get('/',retrievePosts)
//POST Request to create post 
router.post('/add',addPosts)
//POST Request to update post 
router.put('/update/:id',updatePost)
//POST Request to delete post 
router.delete('/delete/:id',deletePost)
//POST Request to delete posts 
router.delete('/delete',deletePosts)

module.exports=router