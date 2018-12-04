const axios = require("axios");
// API keys and timezone.
const ApiRoutePassword = process.env.ALL_USER_DATA_API_ROUTE_PASSWORD;
const fetchKey = process.env.TIME_API_KEY;

const userDataApi = `http://localhost:3001/api/all/${ApiRoutePassword}`;
//send grid config
const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);   


async function eventIterator(eventsArray, currentUserDateTime) {
    for (let i = 0;  i < eventsArray.length; i++) {
          console.log(currentUserDateTime);
        }
  }


//sends email when date time matches
async function  EmailSender  () {
  await axios.get(userDataApi)
  .then(res =>res.data)
  .then(userData => {
    let totalUserLength = userData.length;
    //iterating all users and get their timezone.
     for (let i = 0; i < totalUserLength; i++) { 
        // userzone is an array of objects containing timeZone of the user at 0 index.
          //currentUserTimze for date and time checking is stored in var.
          // [i] represents the current user so we can use that to obtain all the needed information.
          let currentUserTimeZone = userData[i].userZone[0].timeZone;
          // fetching all users time according to their time zones.
           axios.get(`http://vip.timezonedb.com/v2.1/get-time-zone?key=${fetchKey}&format=json&by=zone&zone=${currentUserTimeZone}`)
          .then(res =>  res.data.formatted)
          .then(timeAndDate => {
                  userEventLength = userData[i].events.length;
                  //current event iterator.
                   eventIterator(userData[i].events, timeAndDate);
              
            
          })
          .catch(err => console.log(err));      
    }
  })
}

module.exports = EmailSender;
