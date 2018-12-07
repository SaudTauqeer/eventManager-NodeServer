# Event Manager NodeJs Server

This is the node.js server portion of the web app. This server handles the emailSending functionality.

## Live Project
http://eventmanager-web.herokuapp.com


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
Environment variables:
* `TIME_API_KEY` from https://timezonedb.com/api
* `SENDGRID_API_KEY` from https://sendgrid.com
* `ALL_USER_DATA_API_ROUTE_PASSWORD` This password should match with the REST api password.


### Installing
Run `npm i` or `npm install` in the terminal.

```
{
  "name": "event-reminder-server",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "dependencies": {
    "@sendgrid/mail": "^6.3.1",
    "axios": "^0.18.0",
    "dotenv": "^6.2.0",
    "express": "^4.16.4"
  }
```
Wait for the dependencies to install.
Then run `node app.js` in the root directory to get the app running.
After running the server you will see `Node server running at PORT`.

## More Details
Checking all users for a match.
 * This server basically iterates through all users registered on the web app and fetches their current date/time dynamically according to their timezone.
  When there is a match it executes a `.send` request using `msg` object on `sendGridApi` containing information about the event. All events contain an object named `sent[default: false]`.
  After the event is sent with a returning  status code `200`, the current event sent object now contains an updated `sent: true` object.
  Now if you have successfully configured the API and added environment variables, then there is at least one event added waiting to be executed.

 ## Response if there is a event in the database
![event](https://raw.githubusercontent.com/SaudTauqeer/eventReminder-NodeServer/master/sendingMessageDemo.png)

 ## Response if there is no event in the database
![no event](https://raw.githubusercontent.com/SaudTauqeer/eventReminder-NodeServer/master/NoEventDemo.png)



## Authors

* **Saud Tauqeer** - (https://github.com/SaudTauqeer)

## Fixes
At first, it was intended for my personal use only, hence nothing was done about handling user data -> commit  : 38538addf0a4a464673a4c534ae431d12d91f017. But then i decided to make it user-oriented.
Hence -> commit : 38538addf0a4a464673a4c534ae431d12d91f017. Using Async/Await.
Possibly better structure with try catch but sticking with promises for now.


## License

This project is licensed under the MIT License.

