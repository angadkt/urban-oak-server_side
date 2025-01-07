import Razorpay from "razorpay";
import dotenv from "dotenv"


dotenv.config()

const razorpay = new Razorpay({
    key_id: "rzp_test_KVYa3j27SRKqtq",
    key_secret: "zZvoDKD9cMaBSTKMO8kFa0jo",
})


export default razorpay