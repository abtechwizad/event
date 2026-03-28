const Expo = require("../../../../db_modules/expoModel");
const createExpo = async (req, res) => {
    try {
        const { title, description, location, theme, date } = req.body;

        if (!title || !description || !location || !theme || !date) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const newExpo = await Expo.create({
            title,
            description,
            location,
            theme,
            date,
            createdBy: req.user.id // from adminAuth middleware
        });

        return res.status(201).json({
            success: true,
            data: newExpo,
            message: "Expo created successfully."
        });

    } catch (err) {
        console.error("Create Expo Error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// -------------------------
// Get All Expos
// -------------------------
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

// -------------------------
// Delete Expo
// -------------------------
const deleteExpo = async (req, res) => {
    try {
        const { id } = req.params;

        const expo = await Expo.findById(id);
        if (!expo) {
            return res.status(404).json({ success: false, message: "Expo not found" });
        }

        await Expo.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Expo deleted successfully."
        });

    } catch (err) {
        console.error("Delete Expo Error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


const updateExpo = async (req, res) => {
  try {
    const { _id, title, description, location, theme, date } = req.body;

    let expo = await Expo.findByIdAndUpdate(
        _id,
        { title, description, location, theme, date },
        { new: true, runValidators: true }
      );

      if (!expo) {
        return res.status(404).json({
          success: false,
          message: "Expo not found"
        });
      }

      return res.status(200).json({
        success: true,
        data: expo,
        message: "Expo updated successfully"
      });
  } catch (err) {
    console.error("Expo Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
    createExpo,
    getExpo,
    deleteExpo,
    updateExpo
};