import userModel from "../models/userModel.js"


// add to cart 
export const addToCart = async (req,res)=>{
    try {
        const {itemId,size} = req.body
        const userId = req.userId

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1
            }else{
                 cartData[itemId][size] = 1
            }
        }else{
            cartData[itemId]= {}
            cartData[itemId][size] = 1
        }
        await userModel.findByIdAndUpdate(userId,{cartData})
    res.json({success:true,message:"Added to Cart"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error})
        
    }
    

}

//update user cart
export const updateCart = async(req,res) =>{
    try {
        const {itemId,size,quantity} = req.body
         const userId = req.userId
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        cartData[itemId][size] = quantity
        await userModel.findByIdAndUpdate(userId,{cartData})
            res.json({success:true,message:"Cart Updated"})

        
    } catch (error) {
         console.log(error)
        res.json({success:false,message:error})
        
    }

}

//get user cart data
export const getUserCart = async(req,res)=>{
    try {
        const userId= req.userId
        
        const userData =  await userModel.findById(userId)
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
        
    } catch (error) {
         console.log(error)
        res.json({success:false,message:error})
        
        
    }

}