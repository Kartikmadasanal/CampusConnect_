import express from "express"
const router = express.Router()

import User from "../models/User.js"
import Token from "../models/token.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import sendEmail from "../sendEmail.js"





// user register
router.post("/register", async (req, res) => {
    try {
        const { username, usn, email, password } = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hashSync(password, salt)
        const newUser = new User({ username, email, usn, password: hashedPassword })
        const savedUser = await newUser.save()

        const token = await new Token({
            userId: savedUser._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}/users/${savedUser.id}/verify/${token.token}`;
        await sendEmail(savedUser.email, "Verify Email For CampusConnect", url);

        res.status(200).send({ Message: "An Email send to your account please verify" })

    }
    catch (err) {
        res.status(500).json(err)
    }

})


// Login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        // console.log(user.verified)

        if (!user) {
            return res.status(404).json("User not found!")
        }
        if (user.verified === false) {
            return res.status(404).json("User Email Not Verified")


        }
        const match = await bcrypt.compare(req.body.password, user.password)

        if (!match) {
            return res.status(401).json("Wrong credentials!")
        }
        const token = jwt.sign({ _id: user._id, username: user.username, email: user.email , isAdmin: user.isAdmin }, process.env.SECRET, { expiresIn: "7d" })
        const { password, ...info } = user._doc;
        res.json({ status: "ok", data: token , user:info });


    }
    catch (err) {
        res.status(500).json(err)
    }
})



//LOGOUT
router.get("/logout", async (req, res) => {
    try {
        res.clearCookie("token", { sameSite: "none", secure: true }).status(200).send("User logged out successfully!")

    }
    catch (err) {
        res.status(500).json(err)
    }
})

//REFETCH USER
router.get("/refetch/:token", (req, res) => {
    const token = req.params.token
    jwt.verify(token, process.env.SECRET, (err, data) => {

        if (err) {
            return res.status(404).json(err)

        }

        res.status(200).json(data)

    })
})







router.get("/:id/verify/:token/", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send({ message: "Invalid link" });

        const token = await Token.findOne({
            // userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send({ message: "Invalid link" });

        user.verified = true;
        await user.save()
        await Token.deleteOne({ _id: token._id });
        res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});
export default router;
