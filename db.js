const mysql = require('mysql2');
const Sequelize = require("sequelize");


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: process.env.DB_PORT
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