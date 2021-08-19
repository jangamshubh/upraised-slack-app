const { createChannel,getAirtableChannels,populateConversationStore } = require("../helpers/createConversations.helper")
const { WebClient, LogLevel } = require("@slack/web-api");
const client = new WebClient(process.env.slack_api_key, {
    logLevel: LogLevel.DEBUG
});
let toBeCreatedChannels = [];
async function removeCreatedChannels(){
    const array1 = await getAirtableChannels();
    const array2 = await populateConversationStore();
    toBeCreatedChannels = array1.filter(val => !array2.includes(val));
    return toBeCreatedChannels;
}

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