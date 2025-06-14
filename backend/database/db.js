const mongoose=require('mongoose')

const connectToDB=async () => {
    try {
        const MONGODB_URI=process.env.MONGODB_URI;
        const connection=await mongoose.connect(MONGODB_URI);
        if(connection){
            console.log("MongoDB is connected");
        }else{
            console.log("MongoDB is failed connect");
        }
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
module.exports=connectToDB