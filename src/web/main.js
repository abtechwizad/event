const express = require("express");
const adminRoute = require("./routes/admin.js")
const exhibitorRoute = require("./routes/exhibitor.js")
const attendeeRoute = require("./routes/attendee.js")
const app = express.Router();


app.get("/",async(req,res)=> {
    res.render("home")
});


app.get("/login",(req,res) => {
    res.render("auth/login")
})
app.get("/register",(req,res) => {
    res.render("auth/register")
})
app.get("/logout", (req, res) => {
    res.clearCookie("user");   // cookie name same hona chahiye
    res.redirect("/login");
});


app.use("/admin",adminRoute)
app.use("/exhibitor",exhibitorRoute)
app.use("/attendee",attendeeRoute)



module.exports = app;