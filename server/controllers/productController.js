
import { v2 as cloudinary } from 'cloudinary'
import productModel  from '../models/productModel.js';
// function for add product
const addProduct = async (req, res) => {
  try {
    const { name, price, bestseller, category, subcategory, description, sizes } = req.body;

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4];

    // Upload images to Cloudinary
    const imagesUrl = await Promise.all(
      images.map(async (itm) => {
        const result = await cloudinary.uploader.upload(itm.path, { resource_type: 'image' });
        return {
          url: result.secure_url,
          public_id: result.public_id
        };
      })
    );

    // Create product in DB
    const product = await productModel.create({
      name,
      description,
      price: Number(price),
      category,
      subcategory,
      bestseller: bestseller === "true" || bestseller === true,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now()
    });

    return res.status(200).json({ success: true, message: "Product Added", product });

  } catch (error) {
    console.error("❌ Error adding product:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


// function for list product
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        return res.json({success:true,message:"Successfully fetched",products})

        
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error})
    }

}

//function for removing product
const removeProduct = async (req,res) => {
    try {
        const {id} = req.body;
        await productModel.findByIdAndDelete(id);
        return res.json({success:true,message:"Product deleted"})
        
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error})
        
    }

}

// function for single product 
const singleProduct = async (req, res) => {
    try {
        const {id} = req.body
        const product = await productModel.findById(id)
        return res.json({success:true,message:"Product fetched successfully",product})
        
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error})
        
    }

}
export { addProduct, listProduct, singleProduct, removeProduct }