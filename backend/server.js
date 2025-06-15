require('dotenv').config()
const express=require('express')
const cors=require('cors')
const connectToDB=require('./database/db')
const homeRoutes=require('./routes/homeRoutes')
const postsRoutes=require('./routes/postsRoutes')
//MongoDB Connection Code
connectToDB()

const app=express()
const PORT=process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/api/v1/home',homeRoutes)
app.use('/api/v1/posts',postsRoutes)


//Server 
app.listen(PORT,()=>console.log(`Server is running successfully`))