const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://abtechsales_db_user:Abtechwizard@abtech.ylr50eg.mongodb.net/event")
.then(() => {
    console.log("Connected successfully");
})
.catch(err => {
    console.log(err);
});