import { createHash } from "node:crypto";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

/**
 * @route POST /api/auth/forgot-password
 */

export const forgotPassword = async(req,res) => {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if(!user){
        return res.json({ message: "If email exists, reset link sent"});
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false});

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    const message = `
    You requested a password reset.
    Click here to reset:
    ${resetUrl}
    
    This link expires in 15 minutes
    `;

    await sendEmail(user.email,"Password reset - Upskillr",message);

    res.json({message: "Reset link sent to email"});

};

/**
 * @route POST /api/auth/reset-password/:token
 */

export const resetPassword = async(req,res) => {
    const hashedToken = createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now()}
    });

    if(!user){
        return res.status(400).json({message: "Invalid or expired token"});
    }

    user.passwordHash = await bcrypt.hash(req.body.password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({message: "Password updated successfully"});
};