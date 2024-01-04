import userModel from "../model/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import createError from "../utils/createError.js";

//register

export const register = async (req, res,next) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 5);

        const newUser = new userModel({ ...req.body, password: hash });
        await newUser.save();
        res.status(201).send("user has been created");

    } catch (err) {
        // res.status(500).json(err)
        next(err)
    }
}



//login
export const login = async (req, res,next) => {
    try {
        const user = await userModel.findOne({ username: req.body.username });
 
        if (!user) {
            return next(createError(404,"user not found"))
        }
        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isCorrect) return next(createError(400,"wrong password or username"))

        const token=jwt.sign({id:user._id},process.env.JWT_KEY)
        const { password, ...info } = user._doc
        

        res.cookie("accessToken",token,{
            httpOnly:true,
        }).status(200).send(info)
    } catch (err) {
        // res.status(500).json(err)
        next(err)
    }
}

//logout
export const logout = async (req, res) => {
    try {
        res.clearCookie("accessToken",{
            sameSite:"none",
            secure:true,

        }).status(200).send("user has been logout")

    } catch (err) {
     next(err)
    }
}