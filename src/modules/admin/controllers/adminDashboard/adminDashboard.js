import Order from "../../../user/models/orderSchema/orderSchema.js";
import UserSchema from "../../../user/models/userSchema/userSchema.js";

export const totalProductsPurchased = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders)
      return res
        .status(404)
        .json({ success: false, message: `orders not found` });

    const productsPurchased = orders.map((item) => item.products).flat();
    console.log(productsPurchased);
    const totalProducts = productsPurchased.length;
    if (!totalProducts)
      return res
        .status(400)
        .json({ success: false, message: `total not found` });
    return res
      .status(200)
      .json({ success: true, message: `data calculated`, data: totalProducts });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `error occured ${err}` });
  }
};

// ==================================================================================

export const handleTotalRevenue = async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$Total_Amount" } } },
    ]);

    if (!result)
      return res
        .status(404)
        .json({ success: false, message: `error on calculation` });
    console.log(result);

    return res
      .status(200)
      .json({ success: true, message: "calculation successful", data: result });
  } catch (err) {
    return res
      .status(500)
      .json({ success: true, message: `server not responding ${err}` });
  }
};

// ======================================================================================

export const handleTotalUsers = async (req, res) => {
  try {
    const totalUsers = await UserSchema.aggregate([{ $count: "totalCount" }]);
    if (!totalUsers)
      return res
        .status(404)
        .json({ success: false, message: `error on calculation` });
    console.log(totalUsers);
    return res
      .status(200)
      .json({ success: true, message: "data fetched", data: totalUsers });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `server not responding ${err}` });
  }
};

// export const handleAdminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (
//       email == process.env.ADMIN_EMAIL &&
//       password == process.env.ADMIN_PASSWORD
//     ) {
//       return res
//         .status(200)
//         .json({ success: true, message: `admin login successful` });
//     }

//     return res
//       .status(404)
//       .json({ success: false, message: `credentials doesnt match` });
//   } catch (err) {
//     return res
//       .status(500)
//       .status({ success: false, message: `server not found  ${err}` });
//   }
// };