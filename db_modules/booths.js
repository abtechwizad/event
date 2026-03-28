const mongoose = require("mongoose");

const boothSchema = new mongoose.Schema({

    expo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Expo"
    },

    boothNumber:String,

    status:{
        type:String,
        enum:["available","reserved"],
        default:"available"
    },

    exhibitor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Exhibitor"
    }

},{
    timestamps:true
});

module.exports = mongoose.model("Booth",boothSchema);