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

const User = sequelize.define("users", {
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    email_verified_at:{
        type: DataTypes.DATE,
        allowNull: true,
        default: null
    },
    remember_token:{
        type: DataTypes.STRING,
        allowNull:true,
        default: null
    }
 });

sequelize.sync().then(() => {
    console.log('User table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 
 module.exports = User