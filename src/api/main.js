const express = require("express");
const { registerUser, loginUser } = require("./controllers/auth");
const adminApi = require("./routes/admin");
const exhibitorApi = require("./routes/exhibitor");
const attendeeApi = require("./routes/attendee");
const app = express.Router();


app.get("/",async(req,res)=> {
    res.send("hi");
});


app.use("/admin",adminApi);
app.use("/exhibitor",exhibitorApi);
app.use("/attendee",attendeeApi);


app.post("/register",registerUser);
app.post("/login",loginUser);

// app.post("/admin/create-booth",);



module.exports = app;