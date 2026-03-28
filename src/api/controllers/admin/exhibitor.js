const Exhibitor = require("../../../../db_modules/exhiptor");

const regExhibitor = async (req, res) => {
    try {

        let data = req.body;

        let logoPath = null;

        if(req.file){
            logoPath = req.file.path;
        }

        const exhibitor = await Exhibitor.create({

            user: req.user?.id, // agar auth hai

            companyName: data.companyName,

            logo: logoPath,

            description: data.description,

            contactEmail: data.contactEmail

        });

        return res.status(200).json({
            success: true,
            message: "Exhibitor registered successfully",
            data: exhibitor
        });

    } catch(err){

        console.log(err);

        return res.status(500).json({
            success:false,
            message:"Server error"
        });

    }
}


module.exports = {regExhibitor}