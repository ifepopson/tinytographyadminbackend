const {Sequelize, DataTypes} = require("sequelize");

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

const Order = sequelize.define("orders", {
    // id:{
    //     type: DataTypes.BIGINT,
    //     autoincrement: true,
    //     primaryKey: true
    // },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    images: {
      type: DataTypes.STRING,
      allowNull: false
    },
    wordpressOrderInfo: {
      type: DataTypes.TEXT,
      allowNull: false
    }
 });

 sequelize.sync().then(() => {
    console.log('Order table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 
 module.exports = Order