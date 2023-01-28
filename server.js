const express = require('express')
const app = express()
const { route } = require('./routes/allRoutes');
const cors = require("cors");
var db = require('./config/db.config')
var bodyParser = require('body-parser')
require("dotenv").config()
port=process.env.PORT||2401

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


route(app);
app.get('/',(req,res)=>{
    res.send("hi")
})
app.listen(port,()=>
{
    console.log('server running at port ' + port ); 
})