require('dotenv').config();
const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//     host: dbConfig.HOST,
//     dialect: dbConfig.dialect,
//     operatorsAliases: false,
//     dialectOptions:{
//         ssl: true,
//         rejectUnauthorized: false,
//     },
//     pool: {
//         max: dbConfig.pool.max,
//         min: dbConfig.pool.min,
//         acquire: dbConfig.pool.acquire,
//         idle: dbConfig.pool.idle
//     }
// });

sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
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