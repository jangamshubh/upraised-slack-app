module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("messages", {
        srNo: {
            type: Sequelize.INTEGER
        },
        text: {
            type: Sequelize.STRING(5000)
        },
        content_type: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
    });

    return Message;
};