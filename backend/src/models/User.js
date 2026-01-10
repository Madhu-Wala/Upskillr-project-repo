import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { randomBytes, createHash } from "node:crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true
    },

    passwordHash: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["learner", "instructor", "admin"],
      default: "learner"
    },

    avatar: {
      type: String
    },

    resetPasswordToken: {
      type: String
    },

    resetPasswordExpire: {
      type: Date
    }

  },
  { timestamps: true }
);

// 🔑 Compare login password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};



// 🔐 Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = randomBytes(32).toString("hex");

  this.resetPasswordToken = createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};



export default mongoose.model("User", userSchema);
