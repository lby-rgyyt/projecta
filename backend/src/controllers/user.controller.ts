import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import type { Request, Response, NextFunction } from "express";

export const updatePassword = async(req:Request,res:Response,next:NextFunction):Promise<void> =>{
    try{
        const { oldPassword, newPassword } = req.body;
        const id = req.user?.id;
        const user = await User.findById(id).select("+password");
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
          }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            res.status(401).json({ success: false, message: "Invalid password" });
            return;
          }
          user.password = newPassword;
          await user.save();
        
          res.status(200).json({ success: true, message: "Password updated" });
    }catch(err){
        next(err);
    }
};