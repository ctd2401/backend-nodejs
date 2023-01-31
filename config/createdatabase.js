// Include Sequelize module
const sequelize = require('./database')
const User = require('../models/user')
const Post = require('../models/post')
const LoginInfo = require('../models/login_info')
sequelize.sync().then(() => {
    console.log('All table created successfully!');
    }).catch((error) => {
    console.error('Unable to create table : ', error);
    });

