module.exports = (sequelize, Sequelize) => {
    const Channel = sequelize.define("channels", {
        name: {
            type: Sequelize.STRING
        },
        slackId: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
    });

    return Channel;
};