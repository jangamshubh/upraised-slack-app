const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./app/models/");
const cron = require('node-cron');
const manageConversations = require("./app/controllers/manageConversations")
const createConversations = require("./app/controllers/createConversations")
const addMessagesToDatabase = require("./app/controllers/addMessagesToDatabase")
const sendMessagesToSlack = require("./app/controllers/sendMessagesToSlack")
var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Upraised Slack Demo" });
});

// Monday Create  Conversation
cron.schedule('05 23 * * 4', function() {
    createConversations.createChannels();
    console.log("Channel Creation Successful - Monday")
});
// Monday Update Conversation
cron.schedule('07 23 * * 4', function() {
    manageConversations.getAllChannels();
    console.log("Channel Updation Successful - Monday")
});
// Monday Create Or Update Messages
cron.schedule('09 23 * * 4', function() {
    addMessagesToDatabase.getAllMessages();
    console.log("Updation or Creation of Messages - Monday")
});
// Monday Send Messages
cron.schedule('11 23 * * 4', function() {
    sendMessagesToSlack.PodcastMessages();
    console.log("Sending Messages Successful - Monday")
});


// Thursday Create  Conversation
cron.schedule('15 23 * * 4', function() {
    createConversations.createChannels();
    console.log("Channel Creation Successful - Thursday")
});
// Thursday Update Conversation
cron.schedule('17 23 * * 4', function() {
    manageConversations.getAllChannels();
    console.log("Channel Updation Successful - Thursday")
});
// Thursday Create Or Update Messages
cron.schedule('19 23 * * 4', function() {
    addMessagesToDatabase.getAllMessages();
    console.log("Updation or Creation of Messages - Thursday")
});
// Thursday Send Messages
cron.schedule('21 23 * * 4', function() {
    sendMessagesToSlack.PodcastMessages();
    console.log("Sending Messages Successful - Thursday")
});



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

