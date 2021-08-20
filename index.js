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
cron.schedule('42 14 * * 5', function() {
    createConversations.createChannels();
    console.log("Channel Creation Successful - Monday")
});
// Monday Update Conversation
cron.schedule('44 14 * * 1', function() {
    manageConversations.getAllChannels();
    console.log("Channel Updation Successful - Monday")
});
// Monday Create Or Update Messages
cron.schedule('46 14 * * 1', function() {
    addMessagesToDatabase.getAllMessages();
    console.log("Updation or Creation of Messages - Monday")
});
// Monday Send Messages
cron.schedule('50 14 * * 1', function() {
    sendMessagesToSlack.PodcastMessages();
    console.log("Sending Messages Successful - Monday")
});

// Tuesday Create Conversation
cron.schedule('52 14 * * 5', function() {
    createConversations.createChannels();
    console.log("Channel Creation Successful - Tuesday")
});
// Tuesday Update Conversation
cron.schedule('54 14 * * 5', function() {
    manageConversations.getAllChannels();
    console.log("Channel Updation Successful - Tuesday")
});
// Tuesday Create Or Update Messages
cron.schedule('56 14 * * 5', function() {
    addMessagesToDatabase.getAllMessages();
    console.log("Updation or Creation of Messages - Tuesday")
});
// Tuesday Send Messages
cron.schedule('00 15 * * 5', function() {
    sendMessagesToSlack.ArticleMessages();
    console.log("Sending Messages Successful - Tuesday")
});

// Wednesday Create Conversation
cron.schedule('02 15 * * 5', function() {
    createConversations.createChannels();
    console.log("Channel Creation Successful - Wednesday")
});
// Wednesday Update Conversation
cron.schedule('04 15 * * 5', function() {
    manageConversations.getAllChannels();
    console.log("Channel Updation Successful - Wednesday")
});
// Wednesday Create Or Update Messages
cron.schedule('06 15 * * 5', function() {
    addMessagesToDatabase.getAllMessages();
    console.log("Updation or Creation of Messages - Wednesday")
});
// Wednesday Send Messages
cron.schedule('10 15 * * 5', function() {
    sendMessagesToSlack.NewsLetterMessages();
    console.log("Sending Messages Successful - Wednesday")
});


// Thursday Create Conversation
cron.schedule('12 15 * * 5', function() {
    createConversations.createChannels();
    console.log("Channel Creation Successful - Thursday")
});
// Thursday Update Conversation
cron.schedule('14 15 * * 5', function() {
    manageConversations.getAllChannels();
    console.log("Channel Updation Successful - Thursday")
});
// Thursday Create Or Update Messages
cron.schedule('16 15 * * 5', function() {
    addMessagesToDatabase.getAllMessages();
    console.log("Updation or Creation of Messages - Thursday")
});
// Thursday Send Messages
cron.schedule('20 15 * * 5', function() {
    sendMessagesToSlack.PodcastMessages();
    console.log("Sending Messages Successful - Thursday")
});

// Friday Create Conversation
cron.schedule('22 15 * * 5', function() {
    createConversations.createChannels();
    console.log("Channel Creation Successful - Friday")
});
// Friday Update Conversation
cron.schedule('24 15 * * 5', function() {
    manageConversations.getAllChannels();
    console.log("Channel Updation Successful - Friday")
});
// Friday Create Or Update Messages
cron.schedule('26 15 * * 5', function() {
    addMessagesToDatabase.getAllMessages();
    console.log("Updation or Creation of Messages - Friday")
});
// Friday Send Messages
cron.schedule('30 15 * * 5', function() {
    sendMessagesToSlack.BookMessages();
    console.log("Sending Messages Successful - Friday")
});



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

