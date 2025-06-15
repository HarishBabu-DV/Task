const mongoose=require('mongoose')
const autoIncrement=require('mongoose-sequence')(mongoose)

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
    },
    id:{
        type:Number,
        trim:true
    }
})

PostsSchema.plugin(autoIncrement,{inc_field:'id'});
module.exports=mongoose.model('posts',PostsSchema)