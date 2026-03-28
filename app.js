require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const mongoose = require("mongoose");

// Routes aur Modules (Ensure these paths are correct in your folder)
// const webApp = require("./src/web/main");
// const webApi = require("./src/api/main");

const app = express();

/* -------------------------------------------
   MongoDB Cloud Connection (Standard Format)
------------------------------------------- */
const mongoURI = "mongodb://abtechsales_db_user:Abtechwizard@ac-ylr50eg-shard-00-00.ylr50eg.mongodb.net:27017,event?ssl=true&authSource=admin&replicaSet=atlas-xxxx-shard-0&retryWrites=true&w=majority";

mongoose.connect(mongoURI)
    .then(() => {
        console.log("------------------------------------------");
        console.log("✅ MUBARAK HO! Cloud MongoDB Connect Ho Gaya!");
        console.log("------------------------------------------");
    })
    .catch((err) => {
        console.log("------------------------------------------");
        console.log("❌ CONNECTION FAIL: Internet ya IP ka masla hai.");
        console.log("Detail Error: " + err.message);
        console.log("------------------------------------------");
    });

/* ------------------------
   Middleware Setup
------------------------ */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* ------------------------
   View Engine Setup
------------------------ */
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "template/views"));
if (hbs.registerPartials) {
    hbs.registerPartials(path.join(__dirname, "template/partials"));
}

/* ------------------------
   Routes
------------------------ */
// Agar aapne routes files abhi nahi banayi toh niche wale test routes use karein
app.get("/", (req, res) => {
    res.send("<h1>Server is Running and Database is Connecting...</h1>");
});

// app.use("/", webApp);
// app.use("/api", webApi);

app.get("/401", (req, res) => {
    res.render("401");
});

/* ------------------------
   Server Start
------------------------ */
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server is LIVE at: http://localhost:${PORT}`);
});