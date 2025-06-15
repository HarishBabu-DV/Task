const mongoose=require('mongoose')
const autoIncrement=require('mongoose-sequence')(mongoose)

// Posts Schema 
const PostsSchema=new mongoose.Schema({
    userId:{
        type: Number,
        required:true,
        trim:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    body:{
        type:String,
        required:true,
        trim:true
    }
})

/*Adding autoIncrement as a plugin to implement 
id with auto increment in mongodb collection*/
PostsSchema.plugin(autoIncrement,{inc_field:'id'});

// Posts Model 
module.exports=mongoose.model('posts',PostsSchema)