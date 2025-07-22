import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied. No token provided." });
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decodeToken.id;

    next();
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default userAuth;
