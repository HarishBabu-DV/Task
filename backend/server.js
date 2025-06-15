require('dotenv').config()
const express=require('express')
const cors=require('cors')
const connectToDB=require('./database/db')
const homeRoutes=require('./routes/homeRoutes')
const postsRoutes=require('./routes/postsRoutes')

//MongoDB Connection Code
connectToDB()

//Creating the app using express
const app=express()

//PORT 
const PORT=process.env.PORT || 3000

//Using cors to access from any resource
app.use(cors())
//Middleware to evaluate whether the request is in json format
app.use(express.json())
//Route to home page
app.use('/api/v1/home',homeRoutes)
//Route to posts page
app.use('/api/v1/posts',postsRoutes)


//Starting server to listen for requests 
app.listen(PORT,()=>console.log(`Server is running successfully`))