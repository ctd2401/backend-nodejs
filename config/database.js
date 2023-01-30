// Include Sequelize module
const Sequelize = require('sequelize')
const User = require('../models/user')
//const Post = require('../models/post')
// Creating new Object of Sequelize
const sequelize = new Sequelize(
    'nodejs1',
    'root',
    'Chien2401', {
  
        // Explicitly specifying 
        // mysql database
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        // By default host is 'localhost'           
        host: 'localhost'
    }
);
  
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });


 
// test connect to db
module.exports = sequelize