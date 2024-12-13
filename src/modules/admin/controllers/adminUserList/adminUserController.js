import mongoose from "mongoose";
import UserSchema from "../../../user/models/userSchema/userSchema.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserSchema.find();
    console.log(users);
    if (!users)
      return res
        .status(404)
        .json({ success: false, message: `user fetching failed` });

    return res.status(200).json({
      success: true,
      message: `users data fetched successfully`,
      data: users,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `server not responding ${err}` });
  }
};

// ==================================================================================

export const getUsersById = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(404).json({ success: false, message: `user invalid` });

    const specificUser = await UserSchema.findById(userId);
    if (!specificUser)
      return res
        .status(404)
        .json({ success: false, message: ` user not found` });

    return res.status(200).json({
      succsess: true,
      message: `user fetched successfully`,
      data: specificUser,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `server not responding ${err}` });
  }
};

// =============================================================================

export const removeUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(200).json({ success: false, message: `user invalid` });

    const specificUser = await UserSchema.findByIdAndDelete(userId);
    if (!specificUser)
      return res
        .status(404)
        .json({ success: false, message: "user not found" });

    return res
      .status(200)
      .json({ success: true, message: `user deleted`, data: specificUser });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `server not responding ${err}` });
  }
};

// ================================================================================

export const blockAndUnblockUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(200).json({ success: false, message: `user invalid` });

    const user = await UserSchema.findById(userId)
    if (!user)
      return res.status(404).json({ success: false, message: `invalid user` });

    user.isBlocked = !user.isBlocked
    await user.save()

    const action = user.isBlocked? "Blocked":"Unblocked"
    console.log(action);
    return res.status(200).json({success:true, message:`user ${action}`, data:user})

  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `server not responding ${err}` });
  }
};

// =========================================================================