const mongoose = require("mongoose");

const expoSchema = new mongoose.Schema({

    title:String,
    description:String,
    location:String,
    theme:String,

    date:Date,

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{
    timestamps:true
});

module.exports = mongoose.model("Expo", expoSchema);