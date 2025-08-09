

// placing orderusing cod

import toast from "react-hot-toast"
import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import razorpay from "razorpay"



const placeOrder = async (req, res) => {
   try {
      const { items, address, amount } = req.body
      const userId = req.userId
      const order = await orderModel.create({
         userId,
         items,
         address, amount,
         paymentMethod: "COD",
         payment: false,
         date: Date.now()

      })
      await userModel.findByIdAndUpdate(userId, { cartData: {} })
      return res.json({ success: true, message: "Order PLaced", order })


   } catch (error) {
      console.log(error)
      return res.json({success:false,message:error.message})

   }


}

//initialize razorpay order
const razorpayInstance = new razorpay({
   key_id : process.env.RAZORPAY_KEY_ID,
   key_secret : process.env.RAZORPAY_KEY_SECRET
}

)

//placing order using   Razorpay 
const currency = 'inr'
const placeOrderRazorpay = async (req, res) => {
   try {
      const {items,amount,address} = req.body;
      const userId = req.userId;
      const newOrder = await orderModel.create({
         userId,
         items,
         address,
         amount,
         paymentMethod:"Razorpay",
         payment:false,
         date:Date.now()

      })
      const options = {
         amount : amount * 100,
         currency : currency.toUpperCase(),
         receipt : newOrder._id.toString()


      }
      await razorpayInstance.orders.create(options,(error,order)=>{
         if(error){
            console.log(error)
            return res.json({success:false,message:error.message})
         }
         return res.json({success:true,order})
      })
      
   } catch (error) {
      console.log(error)
      return res.json({success:false,message:error.message})


      
   }

}

const verifyRazorpay = async (req,res)=>{
   try {
      const userId = req.userId;
      const {razorpay_order_id} = req.body
      const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
      if(orderInfo.status === "paid"){
         await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
         await userModel.findByIdAndUpdate(userId,{cartData:{}})
         return res.json({success:true,message:"Payment Successfull"})
      }else{
                  return res.json({success:true,message:"Payment Failed"})


      }

      
   } catch (error) {
      console.log(error)
      return res.json({success:false,message:error.message})

      
   }
}

// all orders for admin panel
const allOrders = async (req, res) => {

   try {

      const orders = await orderModel.find()
      res.json({success:true,orders})
      
   } catch (error) {
      console.log(error)
      return res.json({success:false,message:error.message})
      
   }

}

//user order data for frontend
const userOrders = async (req, res) => {
   try {
      const userId = req.userId
      const orders = await orderModel.find({userId})
      res.json({success:true,message:"Orders fetched Successfully",orders})
 
   } catch (error) {
      console.log(error)
      return res.json({success:false,message:error.message})
   }

}

// update order status 
const updateStatus = async (req, res) => {
   try {
      const {orderId,status} = req.body
      await orderModel.findByIdAndUpdate(orderId,{status})
      return res.json({success:true,message:"Message Updated Successfully"})

      
   } catch (error) {
      console.log(error)
      return res.json({success:false,message:error.message})
      
   }

}

export { verifyRazorpay,placeOrder, placeOrderRazorpay, allOrders, userOrders, updateStatus }