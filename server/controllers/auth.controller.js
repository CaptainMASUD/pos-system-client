import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username  || !password || username === ""  || password === "") {
        return next(errorHandler(400, "All fields are required!")); 
    }
 
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        password: hashPassword,
    });

    try {
        await newUser.save();
        return res.status(201).json({
            message: "Signup successful"
        });
    } catch (error) {
        return next(error); 
    }
};

export const signin = async (req, res, next) => {
    const { username, password } = req.body;

  
    if (!username || !password || username === "" || password === "") {
        return next(errorHandler(400, "All fields are required"));  
    }

    try {
        const validUser = await User.findOne({ username });
        if (!validUser) {
            return next(errorHandler(404, "User not found")); 
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, "Invalid Password"));  
        }

        const token = jwt.sign(
            { id: validUser._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIREY }
        );

        const {password : pass, ...restOftheValues} = validUser._doc;

        return res
            .status(200)
            .cookie('access_token', token, { httpOnly: true })  
            .json({
                message: "Signin successful",
                user: restOftheValues  
            });

    } catch (error) {
        return next(error);  
    }
};
