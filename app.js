const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const hbs = require("hbs");
require("./db_modules/main");
const webApp = require("./src/web/main");
const webApi = require("./src/api/main");

const app = express();

/* ------------------------
   Body Parser Setup
------------------------ */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* ------------------------
   Cookie Parser Setup
------------------------ */
app.use(cookieParser());

/* ------------------------
   Static Files
------------------------ */
app.use(express.static(path.join(__dirname, "public")));

/* ------------------------
   HBS View Engine Setup
------------------------ */

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "template/views"));

hbs.registerPartials(path.join(__dirname, "template/partials"));

/* ------------------------
   Routes
------------------------ */

app.use("/", webApp);
app.use("/api", webApi);


app.get("/401",(req,res) => {
   res.render("401")
})

/* ------------------------
   Server
------------------------ */

app.listen(8000, () => {
    console.log("Server running on port 8000");
});