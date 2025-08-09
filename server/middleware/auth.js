
import jwt from 'jsonwebtoken'

export const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }

  const token = authHeader.split(" ")[1]; // Gets actual token part

  try {
    const token_decode = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

