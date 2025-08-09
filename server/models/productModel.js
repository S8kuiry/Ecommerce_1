

import mongoose  from "mongoose";

const productSchema = mongoose.Schema({
    name:{type:String, requierd:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:Array,required:true},
    category:{type:String,required:true},
    subcategory:{type:String,require:true},
    sizes:{type:Array,required:true},
    bestseller:{type:Boolean},
    date:{type:Number,required:true}
})
const productModel = mongoose.model('product',productSchema)
export default productModel;