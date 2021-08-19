var expect = require("chai").expect;
var sendMessagesToSlack = require("../app/helpers/sendMessagesToSlack.helper");
describe("SEND MESSAGES TO SLACK", function () {
    describe("1. GET MESSAGES TO BE SENT", function () {
        it("It Checks if Messages IDs are sent or not", async function() {
            let messageIds = [1,2,3];
            let contentType = 'Podcasts';
            let messages = await sendMessagesToSlack.getMessagesToBeSent(messageIds,contentType);
            // console.log(messages);
            expect(messages).be.a("array");
        })
    })
})