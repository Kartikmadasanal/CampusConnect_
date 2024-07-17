import express from "express"
const router = express.Router()

import User from "../models/User.js"
import sendEmail from "../sendEmail.js"




// send password link
router.post("/", async (req, res) => {
    // console.log(req.body);

    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user)
            return res
                .status(409)
                .send({ message: "Not the User" });


        await sendEmail(process.env.USER, req.body.subject, `${req.body.message} from ${user.email}`);

        res.status(200).send({ message: `Thank you ${user.username}, your Reaspoce is recived` });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});







export default router

