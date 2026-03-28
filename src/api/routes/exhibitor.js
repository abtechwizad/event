const express = require("express");
const { upload } = require("../../web/modules/multer");
const { regExhibitor } = require("../controllers/admin/exhibitor");
const { getExpo } = require("../controllers/exhibitor/expo");
const { getAllBooths, reserveBooth, myBooth } = require("../controllers/exhibitor/booth");
const { exhibitorApiAuth } = require("../middleware/exhibitorAuth");
const api = express.Router();


api.use(exhibitorApiAuth);



api.post("/register-exhibitor", upload.single("logo"), regExhibitor);


api.get("/get-expo",getExpo);
api.post("/get-booth",getAllBooths);
api.post("/reserve-booth",reserveBooth);
api.get("/my-booth",myBooth);


module.exports = api;