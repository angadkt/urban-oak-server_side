import mongoose from "mongoose";
import UserSchema from "../../../user/models/userSchema/userSchema.js";

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
      return res
        .status(404)
        .json({ success: false, message: ` user not found` });

    return res.status(200).json({
      succsess: true,
      message: `user fetched successfully`,
      data: specificUser,
    });
  
};

// =============================================================================

export const removeUser = async (req, res) => {
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

// export const getAllUsers = async (req, res) => {
//   try {
//     const allUsers = await UserSchema.find();
//     if (!allUsers)
//       return res
//         .status(404)
//         .json({ success: false, message: `users not found` });

//     return res
//       .status(200)
//       .json({
//         success: true,
//         message: `users data fetched successfully`,
//         data: allUsers,
//       });
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ success: false, message: `server side error ${err}` });
//   }
// };

// export const getUsersById = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     if (!mongoose.Types.ObjectId.isValid(userId))
//       return res.status(404).json({ success: false, message: `invalid user` });

//     const specificUser = await UserSchema.findById(userId);
//     if (!specificUser)
//       return res
//         .status(400)
//         .json({ success: false, message: `user not found` });

//     return res
//       .status(200)
//       .json({
//         success: false,
//         message: `user data fetched successfully`,
//         data: specificUser,
//       });
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ success: false, message: `server not found ${err}` });
//   }
// };

// export const removeUser = async (req,res) => {
//   try{
//     const userId = req.params.id
//     if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({success:false, message:`user invalid`})

//     const specificUserRemoval = await UserSchema.findByIdAndDelete(userId)
//     if(!specificUserRemoval) return res.status(400).json({success:false, message:`user deletion failed`})

//       return res.status(200).json({success:true, message:`user deleted successfully`, data:specificUserRemoval})

//   }
//   catch(err){
//     return res.status(500).json({success:false, message: `server not found ${err}`})
//   }
// }

// export const blockAndUnblockUser = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     if (!mongoose.Types.ObjectId.isValid(userId))
//       return res.status(400).json({ success: false, message: `invalid user` });

//     const specificUser = await UserSchema.findById(userId);

//     if (!specificUser)
//       return res
//         .status(400)
//         .json({ success: false, message: `failed to fetch user` });
    
//     specificUser.isBlocked = !specificUser.isBlocked
//     await specificUser.save()

//     const action = specificUser.isBlocked? "Blocked" : "Unblocked"

//     return res.status(200).json({success:true, message:`user ${action}` ,data:specificUser})

//   } catch (err) {
//     return res
//       .status(500)
//       .json({ success: false, message: `server not found ${err}` });
//   }
// };
