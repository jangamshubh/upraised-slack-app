require('dotenv').config();

// Import the helper functions
const { getMessagesToBeSent,sendMessages,getInitialMessageToBeSent, findAllChannels }  = require("../helpers/sendMessagesToSlack.helper");

/*
* Send Messages with Content Type as Podcasts
*/
module.exports.PodcastMessages = async function sendPodcastMessages(){
    let contentType = "Podcasts";
    const channels = await findAllChannels();
    for (const channel of channels) {
        let sentMessageIds = [];
        const messageIds = await channel.getMessages({ raw:true});
        messageIds.forEach(function (messageIds) {
            sentMessageIds.push(messageIds.id);
        })
        /*
        * Doing this If else to check if any messages has been sent earlier
        * If there are any messages which are sent, we then get those IDs from the database and then remove them from final selection
        * Else just bring the first message from the table
        */
        if(sentMessageIds.length >= 1) {
            const messagesToBeSent = await getMessagesToBeSent(sentMessageIds,contentType);
            // Checking if the messages exist and only then send them to the sendMessages Function
            if(messagesToBeSent.length) {
                const sendMessage = await sendMessages(channel, messagesToBeSent);
            }
        } else {
            const messagesToBeSent = await getInitialMessageToBeSent(contentType);
            // Checking if the messages exist and only then send them to the sendMessages Function
            if(messagesToBeSent.length) {
                const sendMessage = await sendMessages(channel, messagesToBeSent);
            }
        }
    }
}

/*
* Send Messages with Content Type as Articles
*/
module.exports.ArticleMessages = async function sendArticleMessages(){
    let contentType = "Articles";
    const channels = await findAllChannels();
    for (const channel of channels) {
        let sentMessageIds = [];
        const messageIds = await channel.getMessages({ raw:true});
        messageIds.forEach(function (messageIds) {
            sentMessageIds.push(messageIds.id);
        })
        /*
        * Doing this If else to check if any messages has been sent earlier
        * If there are any messages which are sent, we then get those IDs from the database and then remove them from final selection
        * Else just bring the first message from the table
        */
        if(sentMessageIds.length >= 1) {
            const messagesToBeSent = await getMessagesToBeSent(sentMessageIds,contentType);
            // Checking if the messages exist and only then send them to the sendMessages Function
            if(messagesToBeSent.length) {
                const sendMessage = await sendMessages(channel, messagesToBeSent);
            }
        } else {
            const messagesToBeSent = await getInitialMessageToBeSent(contentType);
            // Checking if the messages exist and only then send them to the sendMessages Function
            if(messagesToBeSent.length) {
                const sendMessage = await sendMessages(channel, messagesToBeSent);
            }
        }
    }
}

/*
* Send Messages with Content Type as NewsLetter
*/
module.exports.NewsLetterMessages = async function sendNewsLetterMessages(){
    let contentType = "Newsletters";
    const channels = await findAllChannels();
    for (const channel of channels) {
        let sentMessageIds = [];
        const messageIds = await channel.getMessages({ raw:true});
        messageIds.forEach(function (messageIds) {
            sentMessageIds.push(messageIds.id);
        })
        /*
        * Doing this If else to check if any messages has been sent earlier
        * If there are any messages which are sent, we then get those IDs from the database and then remove them from final selection
        * Else just bring the first message from the table
        */
        if(sentMessageIds.length >= 1) {
            const messagesToBeSent = await getMessagesToBeSent(sentMessageIds,contentType);
            // Checking if the messages exist and only then send them to the sendMessages Function
            if(messagesToBeSent.length) {
                const sendMessage = await sendMessages(channel, messagesToBeSent);
            }
        } else {
            const messagesToBeSent = await getInitialMessageToBeSent(contentType);
            // Checking if the messages exist and only then send them to the sendMessages Function
            if(messagesToBeSent.length) {
                const sendMessage = await sendMessages(channel, messagesToBeSent);
            }
        }
    }
}

/*
* Send Messages with Content Type as Books
*/
module.exports.BookMessages = async function sendBookMessages(){
    let contentType = "Books";
    const channels = await findAllChannels();
    for (const channel of channels) {
        let sentMessageIds = [];
        const messageIds = await channel.getMessages({ raw:true});
        messageIds.forEach(function (messageIds) {
            sentMessageIds.push(messageIds.id);
        })
        /*
        * Doing this If else to check if any messages has been sent earlier
        * If there are any messages which are sent, we then get those IDs from the database and then remove them from final selection
        * Else just bring the first message from the table
        */
        if(sentMessageIds.length >= 1) {
            const messagesToBeSent = await getMessagesToBeSent(sentMessageIds,contentType);
            // Checking if the messages exist and only then send them to the sendMessages Function
            if(messagesToBeSent.length) {
                const sendMessage = await sendMessages(channel, messagesToBeSent);
            }
        } else {
            const messagesToBeSent = await getInitialMessageToBeSent(contentType);
            // Checking if the messages exist and only then send them to the sendMessages Function
            if(messagesToBeSent.length) {
                const sendMessage = await sendMessages(channel, messagesToBeSent);
            }
        }
    }
}