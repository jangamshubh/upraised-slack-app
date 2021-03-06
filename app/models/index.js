const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.channels = require("./channels.model")(sequelize, Sequelize);
db.messages = require("./messages.model")(sequelize, Sequelize);
db.sent_messages = require("./sent-messages.model")(sequelize, Sequelize);
db.messages.belongsToMany(db.channels, { through: db.sent_messages });
db.channels.belongsToMany(db.messages, { through: db.sent_messages });

module.exports = db;