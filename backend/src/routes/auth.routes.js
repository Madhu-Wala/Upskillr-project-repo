import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import {
  forgotPassword,
  resetPassword
} from "../controllers/password.controller.js";



const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

//forgot-password routes

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);


export default router;
