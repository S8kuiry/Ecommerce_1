import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()


const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({ success: false, message: "Not Authorized Login Again" });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer "

    const token_decode = jwt.verify(token, process.env.SECRET_KEY);

    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    next();
  } catch (error) {
    console.log("Authorization error:", error.message);
    return res.json({ success: false, message: "Authorization failed" });
  }
};

export default adminAuth;
