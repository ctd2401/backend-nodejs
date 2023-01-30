const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../config/database')
const Post = sequelize.define('post', {
    post_id:{
 
       type:Sequelize.INTEGER,
 
       autoIncrement:true,
 
       allowNull:false,
 
       primaryKey:true
    },
    owner: { type: Sequelize.INTEGER, allowNull:false },
 
    content: { type: Sequelize.STRING, allowNull:false },
    
    public_url: {type:Sequelize.STRING,allowNull:false},

    like_count:{type:Sequelize.INTEGER,allowNull:false,defaultValue:0},
 
 
    //Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
})
 
module.exports = Post