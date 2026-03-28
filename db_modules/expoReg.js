const mongoose = require("mongoose");

const expoRegistrationSchema = new mongoose.Schema({

    expo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expo",
        required: true
    },

    attendee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    status:{
        type:String,
        enum:["registered","cancelled"],
        default:"registered"
    }

},{
    timestamps:true
});

module.exports = mongoose.model("ExpoRegistration", expoRegistrationSchema);