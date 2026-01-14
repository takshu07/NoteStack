import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import {User} from "../models/user.js";
import {RegisterauthSchema} from "../validation/Registervalidation.js"
import {generateToken} from "../utility/jwtUtility.js";
import {LoginauthSchema} from "../validation/LoginValidation.js"
export const Register = async (req: Request, res: Response) => {
    //Zod validation
  const parsed = RegisterauthSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  const { name ,email, password } = parsed.data;

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        message: "User already exists, please login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    //bcrypt is used here to hash password before storing in db
    //real password is not stored in db it is only known to the user
    //it is used to maintain safety for user password during db leaks

    const newUser = new User({
        name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message:"User registered successfully",
    });
  } catch (err: any) {
    return res.status(500).json({
      message: `Server error: ${err.message}`,
    });
  }
};
export const Login = async (req: Request, res: Response) => {
  const parsed = LoginauthSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  const { email, password } = parsed.data;

  try {
    const existingUser = await User.findOne({ email }).select("+password");

    if (!existingUser) {
      return res.status(400).json({
        message: "User does not exist, please register",
      });
    }

    const isValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateToken(
      existingUser.email,
      existingUser.userUUID
    );

    // 🔐 SET JWT IN HTTP-ONLY COOKIE
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // use "none" + secure for cross-site
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // ❌ DO NOT SEND TOKEN IN RESPONSE
    return res.status(200).json({
      message: "Login successful",
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({
      message: "Server error",
      error: err instanceof Error ? err.message : err,
    });
  }
};

export const Logout = (_req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json({ message: "Logged out successfully" });
};
