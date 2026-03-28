const expoModel = require("../../../../db_modules/expoModel");
const Expo = require("../../../../db_modules/expoModel");
const expoReg = require("../../../../db_modules/expoReg");

const getExpo = async (req, res) => {
    try {
        let userId = req.user.id;

        const expos = await Expo.find()
            .populate("createdBy", "name email")
            .lean();

        const expoIds = expos.map(ele => ele._id);

        // user ki registrations nikal lo
        const registrations = await expoReg.find({
            attendee: userId,
            expo: { $in: expoIds },
            status: "registered"
        });

        const registeredExpoIds = registrations.map(r => r.expo.toString());

        const finalExpos = expos.map(ele => {
            return {
                ...ele,
                reserved: registeredExpoIds.includes(ele._id.toString())
            };
        });

        return res.status(200).json({
            success: true,
            data: finalExpos
        });

    } catch (err) {
        console.error("Get Expo Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};



const regAttendeeExpo = async (req, res) => {
    try {

        let userId = req.user.id;
        let { expoId } = req.body;

        if (!expoId) {
            return res.status(400).json({
                success: false,
                message: "Expo ID required"
            });
        }

        // check already registered
        let already = await expoReg.findOne({
            expo: expoId,
            attendee: userId,
            status: "registered"
        });

        if (already) {
            return res.status(400).json({
                success: false,
                message: "Already registered for this expo"
            });
        }

        const registration = await expoReg.create({
            expo: expoId,
            attendee: userId
        });

        return res.status(201).json({
            success: true,
            message: "Successfully registered",
            data: registration
        });

    } catch (err) {
        console.error("Register Expo Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}


const getExpoCount = async(req,res) => {
    try{
        let userId = req.user.id;
        let data = await expoReg.countDocuments({attendee: userId});


        res.status(200).json({success: true, data: data})

    }catch(err){
          console.error("Register Expo Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}


module.exports = {getExpo, regAttendeeExpo,getExpoCount}