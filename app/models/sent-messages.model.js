module.exports = (sequelize, Sequelize) => {
    const sentMessage = sequelize.define("sent_messages", {});

    return sentMessage;
};