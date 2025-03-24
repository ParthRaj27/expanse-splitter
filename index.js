const express = require("express")
require('dotenv').config()
const authroutes = require("./routes/authentication.routes");
const approutes = require("./routes/application.routes")
const { connectDB } = require("./db");
const app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static("public"));
const port =  process.env.port;
const path = require("path");


app.use("/", authroutes)
app.use("/application",approutes)
app.use(express.static(path.join(__dirname, "public")));
app.listen(port,()=>{
    connectDB()
    console.log(`production line on port ${port}`)
})
