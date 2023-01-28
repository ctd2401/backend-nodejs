var db = require('../config/db.config.js')
var User = {
  getAllUser:function(cb){
    return db.query("Select * from user",cb);
  },
  getNumberUser:function(cb){
    return db.query("Select count(*) from user",cb);
  },
  getOneUser:function(id,cb){
    return db.query("select * from user where iduser=?",[id],cb);
  },
  findByUserName:function(un,cb){
    return db.query("select * from user where username=?",[un],cb);
  },
  addOneUser:function(user,cb){
    return db.query("Insert into user(username,password,name) values(?,?,?)",[user.username,user.password,user.name],cb)
  }
};
module.exports=User;