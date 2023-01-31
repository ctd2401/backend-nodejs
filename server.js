const express = require('express')
const app = express()
const { route } = require('./routes/allRoutes');
const cors = require("cors");
var bodyParser = require('body-parser')
require("dotenv").config()
const sequelize = require('./config/database')
port=process.env.PORT||2401
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

route(app);

app.get('/createDB',(req,res)=>{
    const db = require('./config/createdatabase')
})
app.get('/',(req,res)=>{
    res.send("hi")
})
app.listen(port,()=>
{
    console.log('server running at port ' + port ); 
})