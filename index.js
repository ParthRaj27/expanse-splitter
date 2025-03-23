const express = require("express")
require('dotenv').config()
const app = express();
const port =  process.env.port;

app.listen(port,()=>{
    console.log(`production line on port ${port}`)
})
