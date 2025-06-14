const express=require('express')
const router=express.Router()
const {storePosts,retrievePosts,addPosts,updatePost,deletePost}=require('../controllers/postsController')

router.post('/store',storePosts)
router.get('/',retrievePosts)
router.post('/add',addPosts)
router.put('/update/:id',updatePost)
router.delete('/delete/:id',deletePost)

module.exports=router