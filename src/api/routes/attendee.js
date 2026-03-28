const express = require("express");
const { attendeeAuth } = require("../middleware/attendeeAuth");
const { getExpo, regAttendeeExpo, getExpoCount } = require("../controllers/attendee/expo");
const api = express.Router();


api.use(attendeeAuth);





api.get("/get-expo",getExpo);
api.post("/reg-attendee-expo",regAttendeeExpo);
api.get("/expo-reg-count",getExpoCount)


module.exports = api;