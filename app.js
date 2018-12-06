require('dotenv').config()

const express = require("express");
const app = express();
const port =  process.env.PORT;
//email sending module
const emailSender = require ("./emailSender");

setInterval(emailSender, 20000);



app.listen(port, ()=>{
    console.log("Node server running at " + port);
});
