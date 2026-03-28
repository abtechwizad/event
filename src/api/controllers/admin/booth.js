const boothModel = require("../../../../db_modules/booths");
const expoModel = require("../../../../db_modules/expoModel");
const userModel = require("../../../../db_modules/userModel");

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



// CREATE BOOTH
const createBooth = async (req, res) => {
    try {

        const { expoId, boothNumber, size, status } = req.body;

        // basic validation
        if (!expoId || !boothNumber) {
            return res.status(400).json({
                success: false,
                message: "Expo ID and Booth Number are required"
            });
        }

        // check duplicate booth
        const existingBooth = await boothModel.findOne({
            expo: expoId,
            boothNumber: boothNumber
        });

        if (existingBooth) {
            return res.status(400).json({
                success: false,
                message: "Booth already exists"
            });
        }
        console.log(status)
        

        const newBooth = await boothModel.create({
            expo: expoId,
            boothNumber: boothNumber,
            size: size || "standard",
            status: status.toLowerCase() || "available"
        });

        return res.status(201).json({
            success: true,
            message: "Booth created successfully",
            data: newBooth
        });

    } catch (err) {
        console.error("Create Booth Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


const getAllAttendee = async(req,res) => {
    try{
        let data = await userModel.find({role:"attendee"});


        res.status(200).json({success: true,data:data});


        
    }catch(err){
          console.error("Create Booth Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}


const getAllDetails = async(req,res) => {
    try{
        let allAttendee = await userModel.countDocuments({role:"attendee"});
        let allExhibitor = await userModel.countDocuments({role:"exhibitor"});
        let allExpo = await expoModel.countDocuments({})


        let payload ={
            attendee: allAttendee,
            exhibitor: allExhibitor,
            expo: allExpo
        }


        res.status(200).json({success: true,data:payload});


        
    }catch(err){
          console.error("Create Booth Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

module.exports = {
    getAllBooths,
    createBooth,
    getAllAttendee,
    getAllDetails
};