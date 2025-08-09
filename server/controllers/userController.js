import userModel from "../models/userModel.js"
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const createToken = (id) => {

    return jwt.sign({ id }, process.env.SECRET_KEY)
}

// login for user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email })
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)
            if (isMatch) {
                const token = createToken(user._id);
                return res.json({ success: true, message: `Welcome back ${user.name}`, token })
            } else {
                return res.json({ success: false, message: "Invalid Credentials" })


            }
        } else {
            return res.json({ success: false, message: "User dosen't exist" })


        }

    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })


    }

}

// sign up for user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // checking if user already exists 
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User Already exists " })

        }
        // email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword
        })
        const token = createToken(newUser._id);
        return res.json({ success: true, token })

    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })


    }

}


// admin login 



const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign(email+password,process.env.SECRET_KEY);
        res.json({success:true,token,message:"Welcome Admin"})
    }else{
                res.json({success:false,message:"Invalid Crdentials"})


    }

    
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin }