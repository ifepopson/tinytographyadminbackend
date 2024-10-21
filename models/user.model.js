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

const User = sequelize.define("users", {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoincrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
        type: DataTypes.STRING
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
 