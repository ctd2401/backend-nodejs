var mysql=require('mysql2');
var connection=mysql.createPool({
 
host:'localhost',
 user:'root',
 password:'Chien2401',
 database:'nodejs1'
 
});
module.exports=connection;