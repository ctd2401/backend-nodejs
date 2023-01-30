const User = require('../models/user')

exports.register = async (req,res,next) => {
    data = {
        username:req.body.username,
        password:req.body.password,
        dob:req.body.dob,
    }
    try{
        new_user =await User.create(data)
        res.status(200).json({
            status: "success",
            data: { userName: new_user.username, password: new_user.password },
          });
    }
    catch(err){
        res.status(400).json({
            status: "failed",
            reason: err.errors[0].message
        })
        console.log(err)
        next();
    }
}
exports.changepassword = async(req,res,next)=>{
    try{
        checkpass = await User.findAll({limit:1,where:{user_id:req.body.user_id}})
        if(req.body.oldpassword===checkpass[0].password){
            user = await User.update({password : req.body.newpassword},{where:{user_id:req.body.user_id}})
            res.status(200).json({
                status: "updated your password"
              });
        }
        else
            res.status(400).json({
                status: "failed",
                reason: "Wrong oldpass"
            })

    }
    catch(err){
        console.log(err)
        next();
    }
}