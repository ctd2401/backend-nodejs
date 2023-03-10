const User = require('../models/user')
const Login_Info = require('../models/login_info')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

// registration
exports.register = async (req,res,next) => {
    try{
        const tokenTime = { expiresIn: "24h" };
        password = bcrypt.hashSync(req.body.password,parseInt(process.env.SALT_ROUND))
        password2 = bcrypt.hashSync(req.body.password2,parseInt(process.env.SALT_ROUND))
        new_user =await User.create({username:req.body.username,password:password,password2:password2,dob:req.body.dob})
        const token = jwt.sign(
            { userId: new_user.user_id },
            process.env.JWT_SECRET,
            tokenTime
        );
        res.status(200).json({
            status: "success",
            data: { userName: req.body.username, password: req.body.password,password2: req.body.password2,token:token },
          });
    }
    catch(err){
        res.status(400).json({
            status: "failed",
            reason: "username has been registered"
        })
        console.log(err)
        next();
    }
}

// login
exports.login = async (req,res,next) => {
    try{
        const tokenTime = { expiresIn:"1h"}
        const user = await User.findAll({limit:1,where:{username:req.body.username}})
        if(user.length==0){
            res.status(400).json({
                status: "failed",
                reason: "username or password wrong"
            })
            next();
        }
        if(bcrypt.compareSync(req.body.password,user[0].password)){
            const token = await jwt.sign( { userId: user.user_id },
                process.env.JWT_SECRET,
                tokenTime
            );
            var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
            Login_Info.create({user_id:user[0].user_id,ip_device:ip})
            let now = new Date()
            await User.update({last_login : now.toISOString() },{where:{user_id:user[0].user_id}})
            res.status(200).json({log :req.body.username +' has login at '+now.toDateString(),token:token})
        }
        else{
            res.status(400).json({
                status: "failed",
                reason: "username or password wrong"
            })
        }
    }
    catch(error){
        next(error);
    }

}

// change user password 
exports.changepassword = async(req,res,next)=>{
    try{
        checkpass = await User.findAll({limit:1,where:{user_id:req.body.user_id}})
        if(user.length==0){
            res.status(400).json({
                status: "failed",
                reason: "Just handle the error but idk why we have this error T_T"
            })
            next();
        }
        if(bcrypt.compareSync(req.body.oldpassword,checkpass[0].password)){
            newpass = await bcrypt.hashSync(req.body.newpassword,parseInt(process.env.SALT_ROUND))
            user = await User.update({password : newpass},{where:{user_id:req.body.user_id}})
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


// delete account (require pass 2)
exports.deleteaccount =  async(req,res,next) =>{
    try{
        user = await User.findAll({limit:1,where:{user_id:req.body.user_id}})
        if(user.length==0){
            res.status(400).json({
                status: "failed",
                reason: "Just handle the error but idk why we have this error T_T"
            })
            next();
        } 
        if(req.body.currentpass && req.body.pass2)
        {
            if(bcrypt.compareSync(req.body.currentpass,user[0].password))
            {
                if(bcrypt.compareSync(req.body.pass2,user[0].password2))
                {
                    User.destroy({where:{user_id:user[0].user_id}})
                    res.status(200).json({
                        message:"Deleted success!"
                    })
                }
                else{
                    res.status(400).json({
                        message :"pass2 doesn't match"
                    })
                }
            }
            else{
                res.status(400).json({
                    message :"current password doesn't match"
                })
            }
        }
        else{
            res.status(400).json({
                message:"Missing and/or field(s)"
            })
        }

    }
    catch(err){
        console.log(err)
        next();
    }
}