import mongoose from "mongoose";
import UserSchema from "../../../user/models/userSchema/userSchema.js";
import Cart from "../../../user/models/cartSchema/cartSchema.js";

export const getAllUsers = async (req, res) => {
  const users = await UserSchema.find();
  if (!users)
    return res
      .status(404)
      .json({ success: false, message: `user fetching failed` });

  return res.status(200).json({
    success: true,
    message: `users data fetched successfully`,
    data: users,
  });
};

// ==================================================================================

export const getUsersById = async (req, res) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(404).json({ success: false, message: `user invalid` });

  const specificUser = await UserSchema.findById(userId);
  if (!specificUser)
    return res.status(404).json({ success: false, message: ` user not found` });

  return res.status(200).json({
    succsess: true,
    message: `user fetched successfully`,
    data: specificUser,
  });
};

// =============================================================================

export const removeUser = async (req, res) => {
  const userId = req.params.id;
  console.log(userId)
  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(200).json({ success: false, message: `user invalid` });

  const specificUser = await UserSchema.findByIdAndDelete(userId);
  console.log("fetched and deleted ",specificUser);
  
  if (!specificUser)
    return res.status(404).json({ success: false, message: "user not found" });

  return res
    .status(200)
    .json({ success: true, message: `user deleted`, data: specificUser });
};

// ================================================================================

export const blockAndUnblockUser = async (req, res) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(400).json({ success: false, message: `user invalid` });

  const user = await UserSchema.findById(userId);
  if (!user)
    return res.status(404).json({ success: false, message: `invalid user` });

  user.isBlocked = !user.isBlocked;
  await user.save();

  const action = user.isBlocked ? "Blocked" : "Unblocked";
  console.log(action);
  return res
    .status(200)
    .json({ success: true, message: `user ${action}`, data: user });
};

// =========================================================================

export const getSpecificUserCart = async (req, res) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(404).json({ success: false, message: `user invalid` });

  const specificCart = await Cart.findOne({ userId });
  if (!specificCart)
    return res
      .status(404)
      .json({
        success: false,
        message: `cart has no products / cart is missing`,
      });

  return res.status(200).json({success:true, message:`cart fetched successfully`, data:specificCart})
};
