require('dotenv').config();

// DB Import
var db = require("../models")
var messages = db.messages;

// Airtable Import
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.airtable_api_key}).base('app1XaUoOyBiKk6x8');
var messageTable = base("Messages");

/*
* Get All Messages from Airtable
*/
module.exports.getAllMessages = async function getAllMessages() {
    const records = await messageTable.select({
        fields: ["Sr no", "Message Content", "Content Type", "Status"],
        filterByFormula: ""
    }).firstPage();
    for (const record of records) {
        let newRecord = {};
        newRecord.srNo = record.get("Sr no");
        newRecord.text = record.get("Message Content");
        newRecord.content_type = record.get("Content Type");
        newRecord.status = record.get("Status");
        const createMessage = await updateOrCreateMessage(newRecord);
    }
}

/*
* Update the message in the database or create it
*/
async function updateOrCreateMessage(newItem) {
    // First try to find the record
    const foundItem = await messages.findOne({
        where: {
            srNo: newItem.srNo,
        }
    });
    if (!foundItem) {
        // Item not found, create a new one
        const item = await messages.create(newItem)
        return {item, created: true};
    }
    // Found an item, update it
    const item = await messages.update(newItem, {
        where: {
            srNo: newItem.srNo,
        }
    });
    return {item, created: false};
}