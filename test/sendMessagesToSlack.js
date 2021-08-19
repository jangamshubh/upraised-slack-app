var expect = require("chai").expect;
var sendMessagesToSlack = require("../app/helpers/sendMessagesToSlack.helper");
describe("SEND MESSAGES TO SLACK", function () {
    describe("1. GET MESSAGES TO BE SENT", function () {
        it("It Checks if Messages IDs are sent or not & if the messages are returned or not", async function() {
            let messageIds = [1,2,3];
            let contentType = 'Podcasts';
            let messages = await sendMessagesToSlack.getMessagesToBeSent(messageIds,contentType);
            // console.log(messages);
            expect(messages).be.a("array");
        })
    })
    describe("2. GET INITIAL MESSAGE TO BE SENT", function () {
        it("It Checks if First Message is returned or not", async function() {
            let contentType = 'Podcasts';
            let messages = await sendMessagesToSlack.getInitialMessageToBeSent(contentType);
            // console.log(messages);
            expect(messages).be.a("array");
        })
    })
    describe("3. CHANNELS PRESENT OR NOT", function () {
        it("It Checks if the channels exist in the database or not", async function() {
            let channels = await sendMessagesToSlack.findAllChannels();
            // console.log(messages);
            expect(channels).be.a("array");
        })
    })
})