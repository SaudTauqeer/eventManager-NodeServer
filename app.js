require('dotenv').config()

const express = require("express");
const app = express();
const port =  4001;
//email sending module
const emailSender = require ("./emailSender");

setInterval(emailSender, 5000);



app.listen(port, ()=>{
    console.log("Node server running at " + port);
});
