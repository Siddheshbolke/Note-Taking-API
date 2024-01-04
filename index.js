
import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import  userRoute from "./routes/userRoute.js"
import  authRoute from "./routes/authRoute.js"
import noteRoute from   "./routes/noteRoute.js"
import cookieParser from "cookie-parser";
const app=express();




//env configuration
dotenv.config()



//database configuration
const connect= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to mongodb")
        
    } catch (error) {
        console.log(error)
        
    }

}

//middleware
app.use(express.json());
app.use(cookieParser())


//routes
app.use("/api/users",userRoute);
app.use("/api/notes",noteRoute)
app.use("/api/auth",authRoute);



//error handling middleware
app.use((err,req,res,next)=>{
    const errorStatus=err.status || 500
    const errorMessage=err.message || "something went wrong"
    
    return res.status(errorStatus).send(errorMessage);

})



//port listener
app.listen(8800,()=>{
    connect()
    console.log("backend server running")
})