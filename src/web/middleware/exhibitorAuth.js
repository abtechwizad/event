const jwt = require("jsonwebtoken");
require("dotenv").config();

const exhibitorAuth = async (req, res, next) => {
    try {
        // 1️⃣ Get token from cookies
        const token = req.cookies.user;
        if (!token) {
            // No token → redirect to login page
            return res.redirect("/401");
        }

        // 2️⃣ Verify token
        const decoded = jwt.verify(token, process.env.SECRETKEY);

        // 3️⃣ Check role
        if (decoded.role !== "exhibitor") {
            // Wrong role → redirect to 401 page
            return res.redirect("/401");
        }

        // 4️⃣ Attach user info to request for further use
        req.user = decoded;

        // 5️⃣ Proceed to next middleware / route
        next();

    } catch (err) {
        console.error("Admin Auth Error:", err);
        // Token invalid or expired → redirect to 401 page
        return res.redirect("/401");
    }
};

module.exports = { exhibitorAuth };