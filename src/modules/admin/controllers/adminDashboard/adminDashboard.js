import Order from "../../../user/models/orderSchema/orderSchema.js";

export const totalProductsPurchased = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders)
      return res
        .status(404)
        .json({ success: false, message: `orders not found` });

    const productsPurchased = orders.map((item)=> item.products).flat()
    console.log(productsPurchased)
    const totalProducts = productsPurchased.length
    if(!totalProducts) return res.status(400).json({success:false, message:`total not found`})
    return res.status(200).json({success:true, message:`data calculated`, data:totalProducts})

  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `error occured ${err}` });
  }
};




