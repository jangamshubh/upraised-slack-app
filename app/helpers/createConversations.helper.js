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

// Initiating Arrays
let createdConversations = [];
let airtableChannels = [];

/*
* Getting all Channel data from Airtable using API
* */
module.exports.getAirtableChannels = async function getAirtableChannel() {
    const records = await table.select({ fields: ["Slack Channel Name","Status"], filterByFormula: "{Status} = 'Active'"}).firstPage();
    records.forEach(function(record) {
        airtableChannels.push(record.get('Slack Channel Name'));
    });
    return airtableChannels;
}

/*
* Creates the Channel in the Database for further usage
* */
module.exports.createChannel = (data, res) => {
    Channels.create({
        name: data.name,
        slackId: data.slackId,
    })
        .then(channel => { console.log("Channel Saved Successfully!")})
        .catch(err => {});
}
/*
* Get All the Conversations & The Data from Slack to ensure that later when are creating new channels, they don't get repeated
*/
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

/*
* Only take the name and push it into the array
*/
function saveConversations(conversationsArray) {
    conversationsArray.forEach(function(conversation){
        // Key conversation info on its unique ID
        createdConversations.push(conversation["name"]);
    });
    return createdConversations;
}

