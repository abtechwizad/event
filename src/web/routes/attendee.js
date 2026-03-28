const express = require("express");
let {attendeeAuth} = require("../middleware/attendeeAuth");
const route = express.Router();
route.use(attendeeAuth);



route.get("/dashboard",(req,res) => {
    res.render("dashboard/attendee");
})


route.get("/expo",(req,res) => {
    res.render("attendee/expo");
})


module.exports = route;