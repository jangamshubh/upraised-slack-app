require('dotenv').config();

// DB Import
var db = require("../models")
var channels = db.channels;

// Airtable Import
var Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.airtable_api_key }).base('app1XaUoOyBiKk6x8');
const table = base('Channels');

/*
* Why - To get the data for channels from airtable for updation in our database
* How - Use Airtable API and get the data
* */
module.exports.getAllChannels = async function getAllChannels () {
    const records = await table.select({ fields: ["Slack Channel Name","Status"]}).firstPage();
    try {
        for (const record of records) {
            let data = {};
            data.name = record.get("Slack Channel Name");
            data.status = record.get("Status");
            console.log(data);
            const updateChannel = updateChannels(data);
        }
    } catch {
        console.log("Error")
    }
}
/*
* Why - This Function updates the data in the database primarily done to update the status of the channel
* How - Compares the name from airtable channel with column in database and updates the data.
* */
function updateChannels (data) {
    // Found an item, update it
    channels.update(data, {
        where: {
            name:data.name,
        }
    });
}
