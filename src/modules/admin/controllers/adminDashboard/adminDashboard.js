import Order from "../../../user/models/orderSchema/orderSchema.js";
import UserSchema from "../../../user/models/userSchema/userSchema.js";

export const totalProductsPurchased = async (req, res) => {
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
};

// ==================================================================================

export const handleTotalRevenue = async (req, res) => {
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
};

// ======================================================================================

export const handleTotalUsers = async (req, res) => {
    const totalUsers = await UserSchema.aggregate([{ $count: "totalCount" }]);
    if (!totalUsers)
      return res
        .status(404)
        .json({ success: false, message: `error on calculation` });
    console.log(totalUsers);
    return res
      .status(200)
      .json({ success: true, message: "data fetched", data: totalUsers });
};
// ===============================================================


