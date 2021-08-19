require('dotenv').config();

// DB Import
const db = require("../models")
const Channels = db.channels;

// Airtable Data
var Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.airtable_api_key }).base('app1XaUoOyBiKk6x8');
const table = base('Channels');

// Slack Data
const { WebClient, LogLevel } = require("@slack/web-api");
const client = new WebClient(process.env.slack_api_key, {
    logLevel: LogLevel.DEBUG
});

// Arrays
let createdConversations = [];
let airtableChannels = [];

module.exports.getAirtableChannels = async function getAirtableChannel() {
    const records = await table.select({ fields: ["Slack Channel Name","Status"], filterByFormula: "{Status} = 'Active'"}).firstPage();
    records.forEach(function(record) {
        airtableChannels.push(record.get('Slack Channel Name'));
    });
    return airtableChannels;
}


module.exports.createChannel = (data, res) => {
    Channels.create({
        name: data.name,
        slackId: data.slackId,
    })
        .then(channel => { console.log("Data Saved Successfully!")})
        .catch(err => {});
}

module.exports.populateConversationStore = async function populateConversationStore() {
    try {
        const result = await client.conversations.list();
        const saveConversation = saveConversations(result.channels);
        return saveConversation;
    }

    catch (error) {
        console.error(error);
    }
}

// Put conversations into the JavaScript object
function saveConversations(conversationsArray) {
    conversationsArray.forEach(function(conversation){
        // Key conversation info on its unique ID
        createdConversations.push(conversation["name"]);
    });
    return createdConversations;
}

