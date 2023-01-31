const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../config/database')
const Login_Info = sequelize.define('login_info', {
   login_id:{

      type:Sequelize.INTEGER,

      autoIncrement:true,

      allowNull:false,

      primaryKey:true
   },

   user_id: { type: Sequelize.INTEGER, allowNull:false },

   ip_device :{type:Sequelize.STRING},

   //Timestamps
   createdAt: Sequelize.DATE,
   updatedAt: Sequelize.DATE,
})
module.exports = Login_Info