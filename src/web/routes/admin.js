const express = require("express");
const { adminAuth } = require("../middleware/adminAuth");
const route = express.Router();


route.use(adminAuth);



route.get("/dashboard",(req,res) => {
    res.render("dashboard/admin");
})


route.get("/expo/manage",(req,res) => {
    res.render("admin/expo")
})


route.get("/booth/manage",(req,res) => {
    res.render("admin/booth")
})

route.get("/attendee/manage",(req,res) => {
    res.render("admin/manage_attendee")
})


module.exports = route;