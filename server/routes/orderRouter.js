

import express from 'express'
import {placeOrder,placeOrderRazorpay,allOrders,updateStatus,userOrders,verifyRazorpay} from '../controllers/orderController.js'
import { authUser } from '../middleware/auth.js'

const orderRouter = express.Router()

// admin functions
orderRouter.post('/list',allOrders)
orderRouter.post('/status',updateStatus)

// payment  features 
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)
orderRouter.post('/verify',authUser,verifyRazorpay)


// use feature
orderRouter.post('/useorders',authUser,userOrders)

export default orderRouter;