
// Function to generate welcome message on home routes  
const welcomeMsg=async (req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome to the Home Page",
    })
}

module.exports=welcomeMsg

