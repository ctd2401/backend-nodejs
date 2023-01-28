var express = require('express')
var router = express.Router();
var User = require('../models/user')

router.get('/user/:id?',function(req,res,next){
    if(req.params.id){
        User.getOneUser(req.params.id,function(err,rows){
            if(err){
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }else{
        User.getAllUser(function(err,rows){
            if(err){
                res.json(err);
            } else {
                res.json(rows);
            }

        });
    }
});
router.post('/register',function(req,res,next){
    User.findByUserName(req.body.username,(function(err,count){
        if(count.length>0){
            res.send('dup')
            console.log(count)}
        else{
            User.addOneUser(req.body,function(err,count){
                if(err){
                    res.json(err);
                } else{
                    res.json(req.body);
                }});
            };
    }))});
    
module.exports = router;