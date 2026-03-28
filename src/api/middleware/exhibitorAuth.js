const jwt = require("jsonwebtoken"); 
require("dotenv").config();

const exhibitorApiAuth = async (req, res, next) => {
    try {
        // 1️⃣ Get token from cookies
        const token = req.cookies.user;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided."
            });
        }

        // 2️⃣ Verify token
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        // console.log(decoded);

        // 3️⃣ Check role
        if (decoded.role !== "exhibitor") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admins only."
            });
        }

        // 4️⃣ Attach user info to request for further use
        req.user = decoded;

        // 5️⃣ Proceed to next middleware / route
        next();

    } catch (err) {
        console.error("Admin Auth Error:", err);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
};

module.exports = { exhibitorApiAuth };