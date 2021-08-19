require('dotenv').config()

// Import Database Modules
const sequelize = require("sequelize");
const db = require("../models");
const Messages = db.messages;
const sentMessages = db.sent_messages;
const Channels = db.channels;

// Importing Slack Functions
const { WebClient, LogLevel } = require("@slack/web-api");
const client = new WebClient(process.env.slack_api_key, {
    logLevel: LogLevel.DEBUG
});

/*
* Getting All Messages that have not been sent
*/
module.exports.getMessagesToBeSent = async function getMessagesToBeSent(sentMessageIds,contentType) {
    return await Messages.findAll({
        raw: true,
        where: {
            id: {
                [sequelize.Op.not]: sentMessageIds
            },
            content_type: contentType,
            status: 'Active',
        },
        order: [['srNo', 'ASC']],
        limit: 1,

    });
}

/*
* Get The First Message since no message has been sent for this channel
*/
module.exports.getInitialMessageToBeSent = async function getInitialMessageToBeSent(contentType) {
    return await Messages.findAll({
        raw: true,
        where: {
            content_type: contentType,
            status: 'Active',
        },
        order: [['srNo', 'ASC']],
        limit: 1,

    });
}

/*
* Send Messages to Slack
*/
module.exports.sendMessages = async function sendMessages(channelData, messagesToBeSent){
    try {
        const result = await client.chat.postMessage({
            channel: channelData.slackId,
            text: messagesToBeSent[0].text,
        });
        const sent_message = await sentMessages.create({
            channelId: channelData.id,
            messageId: messagesToBeSent[0].id,
        })

    }
    catch (error) {
        console.error(error);
    }
}

/*
* Get All Channels from Database which are active
*/
module.exports.findAllChannels = async function findAllChannels(){
    const channels = await Channels.findAll({
        where: {
            status: 'Active',
        }
    });
    return channels;
}