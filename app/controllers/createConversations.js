// Import the functions from helper file
const { createChannel,getAirtableChannels,populateConversationStore } = require("../helpers/createConversations.helper")

// Importing Slack Files
const { WebClient, LogLevel } = require("@slack/web-api");
const client = new WebClient(process.env.slack_api_key, {
    logLevel: LogLevel.DEBUG
});

// Initiating Array
let toBeCreatedChannels = [];

/*
* We just cross check channels which are created with the channels from airtable and remove them. This is necessary so that channels don't create it again
*/
async function removeCreatedChannels(){
    const array1 = await getAirtableChannels();
    const array2 = await populateConversationStore();
    toBeCreatedChannels = array1.filter(val => !array2.includes(val));
    return toBeCreatedChannels;
}
/*
* Create Channels on Slack & Add them to the Database
*/
module.exports.createChannels = async function createChannels(){
    const channels = await removeCreatedChannels();
    for (const channel of channels) {
        const result = await client.conversations.create({
            name: channel,
        });
        let data = {};
        data.slackId = result.channel.id;
        data.name = result.channel.name;
        createChannel(data);
    }
}