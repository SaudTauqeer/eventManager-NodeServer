const axios = require("axios");
// API keys and timezone.
const timeZone = "Asia/Karachi";
const fetchKey = process.env.TIME_API_KEY;
const timeApiUrl =`http://api.timezonedb.com/v2.1/get-time-zone?key=${fetchKey}&format=json&by=zone&zone=${timeZone}`;
const restApi = "http://localhost:3001/api/event";
//send grid config
const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);   


//sends email when date time matches
function EmailSender () {
    axios.all([
        axios.get(timeApiUrl),
        axios.get(restApi)
      ])
      .then(axios.spread((timeApiRes, restApiRes) => {
        // do something with both responses
        const dateAndTime = timeApiRes.data.formatted;
        //seprated current time and date from https://timezonedb.com/api
        const year =  parseInt(dateAndTime.slice(0, 4)); 
        const month = parseInt(dateAndTime.slice(5, 7));
        const day =   parseInt(dateAndTime.slice(8, 10));
        const hour =  parseInt(dateAndTime.slice(11, 13));
        const minutes = parseInt(dateAndTime.slice(14, 16));
        // Event data api
        const eventData = restApiRes.data;
        for (let i = 0; i < eventData.length; i++ ){

            let msg = {
              to: eventData[i].to,
              from: eventData[i].from ,
              subject: eventData[i].subject,
              text: eventData[i].text,
              html: eventData[i].html
            }

            let sendingHour = parseInt(eventData[i].sendingHour);
            let sendingMinutes = parseInt(eventData[i].sendingMinutes);
            console.log(` sending hour = ${sendingHour} senidng min = ${sendingMinutes}
                          hour = ${hour} min = ${minutes}`);
            //when date time matches.
            if (sendingHour === hour && sendingMinutes === minutes){
                  console.log("Sending mail...");
                  sendGridMail.send(msg)
                  .catch(err => console.log(`Error: ${err}`))
                  .then(()=> console.log("Mail sent to "+ msg.to))

            }
            
            console.log("Checking for possible match to send mail")          
        }

      }))
      .catch(err => console.log(`Error occured : ${err}`));
}

module.exports = EmailSender;