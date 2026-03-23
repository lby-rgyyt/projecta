import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import type { Request, Response, NextFunction } from "express";

export const register = async(req:Request,res:Response,next:NextFunction):Promise<void> =>{
    try {
        const { username,email,password } = req.body;
        const existing = await User.findOne({email});
        if (existing) {
            res.status(409).json({ success: false, message: "Email already in use" });
            return;
          }
        //   const hashedPassword = await bcrypt.hash(password, 10);
          const user  = await User.create({username,email,password});

          res.status(201).json({
            success: true,
            data: {
              _id: user._id,
              username: user.username,
              email: user.email,
              role: user.role,
            },
          });
    } catch(err){
        next(err);
    }
};

export const login = async(req:Request,res:Response,next:NextFunction):Promise<void> =>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            res.status(401).json({ success: false, message: "User not existed" });
            return;
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            res.status(401).json({ success: false, message: "Invalid password" });
            return;
          }
          const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
          );
          res.status(200).json({ success: true, token });
    }catch(err){
        next(err);
    }
}