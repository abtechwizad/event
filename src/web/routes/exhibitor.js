const express = require("express");
const { exhibitorAuth } = require("../middleware/exhibitorAuth");
const exhiptor = require("../../../db_modules/exhiptor");
const route = express.Router();

route.use(exhibitorAuth);

route.get("/register",(req,res) => {
    res.render("exhibitor/register");
})



route.use(async(req,res,next) => {
    let id = req.user.id;
    const data = await exhiptor.findOne({user: id});
    if(!data) return res.status(304).redirect("/exhibitor/register")
    next();
})

route.get("/dashboard",(req,res) => {
    res.render("dashboard/exhibitor");
})


route.get("/expoList",(req,res) => {
    res.render("exhibitor/expoList");
})


route.get("/myBooth",(req,res) => {
    res.render("exhibitor/myBooth");
})


module.exports = route;