const Expo = require("../../../../db_modules/expoModel");


const getExpo = async (req, res) => {
    try {
        const expos = await Expo.find().populate("createdBy", "name email");
        return res.status(200).json({
            success: true,
            data: expos
        });
    } catch (err) {
        console.error("Get Expo Error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


module.exports = {getExpo}