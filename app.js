require('dotenv').config()

const express = require("express");
const app = express();
const port =  process.env.PORT;
//email sending module
const emailSender = require ("./emailSender");

setInterval(emailSender, 20000);


// route for preventing app from idling on heroku free tier.
app.get("/node-ping", (req, res)=>{
    const date = new Date().toLocaleString();
    res.send(`Node js server pinged at ${date}`);
});



app.listen(port, ()=>{
    console.log("Node server running at " + port);
});
