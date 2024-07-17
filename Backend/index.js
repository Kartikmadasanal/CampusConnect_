import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoute from './routes/auth.js'
import userRoute from './routes/users.js'
import postRoute from './routes/posts.js'
import commentRoute from './routes/comments.js'
import passwordResetRoutes from './routes/passwordReset.js'
import sendmessageRoutes from './routes/sendfeed.js'
const app = express()
dotenv.config()

mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("Database connectd");
}).catch((err)=>{
console.log(err);
})


const port = process.env.PORT || 3000 ;

app.use(express.json())
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser())

app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)
app.use("/api/password-reset", passwordResetRoutes);
app.use("/api/sendmessage", sendmessageRoutes);




app.listen(port,()=>{
    console.log(`server runnig on ${port}`)
})
