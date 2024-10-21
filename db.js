const mysql = require('mysql2');
const Sequelize = require("sequelize");


const sequelize = new Sequelize(
    'tinyT',
    'root',
    'root',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 8889
    }
);

const Order = require("./models/order.model")
const User = require("./models/user.model")

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

module.exports = {sequelize, User, Order}