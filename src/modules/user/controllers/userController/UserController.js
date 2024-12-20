import express from "express";
import UserSchema from "../../models/userSchema/userSchema.js";
import { comparePassword, hashPassword } from "../../../utils/bycript.js";
import { generateToken } from "../../../utils/jwt.js";

export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;

  const existUser = await UserSchema.findOne({ email });
  if (existUser) {
    return res
      .status(400)
      .json({ success: false, message: `user already exist` });
  }

  const hashedPassword = await hashPassword(password);
  const newUser = new UserSchema({
    name,
    email,
    password: hashedPassword,
  });
  await newUser.save();

  return res
    .status(201)
    .json({ message: "User registered successfully", data: newUser });

};
//==========================================================================

export const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  const existUser = await UserSchema.findOne({ email });

  if (!existUser) {
    return res
      .status(404)
      .json({ success: false, message: `user not exist. Please register ` });
  }

  const passwordValidation = await comparePassword(
    password,
    existUser.password
  );
  if (!passwordValidation) {
    return res
      .status(404)
      .json({ success: false, message: `password does not match` });
  }

  const token = generateToken(existUser.id);
  console.log(token);

  if (existUser.role === "admin") {
    return res
      .status(200)
      .json({
        success: true,
        message: `admin loginned successfully`,
        data: existUser,
        token,
      });
  }

  return res.status(200).json({
    success: true,
    message: "login successfully",
    data: existUser,
    token,
  });

};



// =========================================================================

