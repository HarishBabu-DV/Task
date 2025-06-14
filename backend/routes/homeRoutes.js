const express=require('express')
const router=express.Router()
const homeController=require('../controllers/homeController')

//GET Request
router.get('/',homeController)

module.exports=router