const {Sequelize, DataTypes} = require("sequelize");

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

const Order = sequelize.define("orders", {
    id:{
        type: DataTypes.BIGINT,
        autoincrement: true,
        primaryKey: true
    },
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
 