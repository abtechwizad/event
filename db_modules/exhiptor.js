const mongoose = require("mongoose");

const exhibitorSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    companyName:String,

    logo:String,

    description:String,

    contactEmail:String

},{
    timestamps:true
});

module.exports = mongoose.model("Exhibitor",exhibitorSchema);