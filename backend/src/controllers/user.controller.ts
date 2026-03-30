import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import type { Request, Response, NextFunction } from "express";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    user.password = newPassword;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
      return;
    }
    next(err);
  }
};

export const sendResetEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    // 不管用户存不存在都返回200
    if (!user) {
      res.status(200).json({
        success: true,
        message: "If the email exists, a reset link has been sent",
      });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "15m",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset your password",
      html: `
        <p>You requested a password reset.</p>
        <p>Click the link below to reset your password (expires in 15 minutes):</p>
        <a href="${process.env.FRONTEND_URL}/profile/reset-password/${token}">
          Reset Password
        </a>
      `,
    });

    res.status(200).json({
      success: true,
      message: "If the email exists, a reset link has been sent",
    });
  } catch (err) {
    next(err);
  }
};

export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
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
  } catch (err) {
    next(err);
  }
};
