const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../config/database')
const User = sequelize.define('user', {
   user_id:{

      type:Sequelize.INTEGER,

      autoIncrement:true,

      allowNull:false,

      primaryKey:true
   },

   username: { type: Sequelize.STRING, allowNull:false,unique:true },
   
   password: { type: Sequelize.STRING, allowNull:false },

   dob: {type:Sequelize.DATE},

   address: {type:Sequelize.STRING},

   last_login: {type:Sequelize.DATE},


   //Timestamps
   createdAt: Sequelize.DATE,
   updatedAt: Sequelize.DATE,
})
module.exports = User