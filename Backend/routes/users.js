 import express from "express"
const router=express.Router()
import User from "../models/User.js"
import bcrypt from "bcrypt"
import Post from "../models/Post.js"
import Comment from "../models/Comment.js"
import verifyToken from "../verifyToken.js"

//UPDATE
router.put("/:id",verifyToken,async (req,res)=>{
    try{
        if(req.body.password){
            const salt=await bcrypt.genSalt(10)
            req.body.password=await bcrypt.hashSync(req.body.password,salt)
        }
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedUser)

    }
    catch(err){
        res.status(500).json(err)
    }
})


//DELETE
router.delete("/:id",async (req,res)=>{
    // console.log(req.body)
    try{
        await User.findByIdAndDelete(req.params.id)
        await Post.deleteMany({userId:req.params.id})
        await Comment.deleteMany({userId:req.params.id}) 
         
        res.status(200).json("User has been deleted!")

    }
    catch(err){
        res.status(500).json(err)
    }
})


//GET USER
router.get("/:id",async (req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        const {password,...info}=user._doc
        res.status(200).json(info)
    }
    catch(err){
        res.status(500).json(err)
    }
})


router.get("/", async (req, res) => {
    const query = req.query;

    try {
        const searchFilter={
            ...(query.search && {
            username:{$regex:query.search, $options:"i"}}
        )}
        const users = await User.find(searchFilter).sort({ createdAt: -1 });
        
        // Exclude password from each user document
        const usersWithoutPassword = users.map(user => {
            const { password, ...rest } = user._doc;
            return rest;
        });
  
        const totalUsers = await User.countDocuments();
  
        // Send response with users without passwords and total count
        res.status(200).json({
            users: usersWithoutPassword,
            totalUsers: totalUsers
        });
    } catch (error) {
        res.status(400).json(error); // Pass error to error handling middleware
    }
})








export default router