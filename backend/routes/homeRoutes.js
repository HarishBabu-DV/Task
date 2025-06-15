const express=require('express')
const router=express.Router()

//Controller to handle Home routes
const homeController=require('../controllers/homeController')

//GET Request for home page
router.get('/',homeController)

module.exports=router