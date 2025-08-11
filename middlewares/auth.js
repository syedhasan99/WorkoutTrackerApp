const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuth = async (req, res, next) => {
    try {
        let token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "You are not authorized." });
        }
        let decodedData = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedData) {
            return res.status(400).json({ message: "Token expired!" });
        }
        req.user = await User.findById(decodedData.id);
        next();
    } catch (error) {
        console.error("Auth error:", error);
        res.status(400).json({ message: "Authentication failed.", error: error.message });
    }
}

module.exports = isAuth;