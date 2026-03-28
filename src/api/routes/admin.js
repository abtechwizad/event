const express = require("express");
const { adminAuth } = require("../middleware/adminAuth");
const { createExpo, getExpo, deleteExpo, updateExpo } = require("../controllers/admin/expo");
const { getAllBooths, createBooth, getAllAttendee, getAllDetails } = require("../controllers/admin/booth");
const api = express.Router();


api.use(adminAuth);


api.post("/expo/create",createExpo);
api.post("/expo/update",updateExpo);
api.get("/expo/get",getExpo);
api.get("/expo/delete/:id",deleteExpo);
api.post("/expos-booths",getAllBooths);
api.post("/create-booth",createBooth);
api.get("/attendee-data",getAllAttendee);
api.get("/dashboard/details",getAllDetails);


module.exports = api;