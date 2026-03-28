const boothModel = require("../../../../db_modules/booths");
const expoModel = require("../../../../db_modules/expoModel");


const getAllBooths = async (req, res) => {
    try {

        const { expoId } = req.body;

        if (!expoId) {
            return res.status(400).json({
                success: false,
                message: "Expo ID is required"
            });
        }

        const booths = await boothModel
            .find({ expo: expoId })
            .sort({ boothNumber: 1 });

        return res.status(200).json({
            success: true,
            data: booths
        });

    } catch (err) {
        console.error("Get Booth Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const reserveBooth = async (req, res) => {
    try {
        const { boothNumber, expoId } = req.body;

        // Authenticated user check (exhibitor)
        if (!req.user || req.user.role !== "exhibitor") {
            return res.status(403).json({
                success: false,
                message: "Only exhibitors can reserve booths"
            });
        }

        // 1️⃣ Find the booth
        const booth = await boothModel.findOne({ expo: expoId, boothNumber: boothNumber });

        if (!booth) {
            return res.status(404).json({
                success: false,
                message: "Booth not found"
            });
        }

        // 2️⃣ Check if already reserved
        if (booth.status === "reserved") {
            return res.status(400).json({
                success: false,
                message: "Booth already reserved"
            });
        }

        // 3️⃣ Update booth
        booth.status = "reserved";
        booth.exhibitor = req.user.id;

        await booth.save();

        // 4️⃣ Respond
        return res.status(200).json({
            success: true,
            message: `Booth ${boothNumber} reserved successfully`,
            data: booth
        });

    } catch (err) {
        console.error("Reserve Booth Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


const myBooth = async (req, res) => {
    try {

        const userId = req.user.id;
        console.log(userId)

        // get booths reserved by this exhibitor
        const userBooth = await boothModel
            .find({ exhibitor: userId })
            .populate("expo");   // join expo details

        return res.status(200).json({
            success: true,
            data: userBooth
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }
};


module.exports = {getAllBooths,reserveBooth,myBooth}