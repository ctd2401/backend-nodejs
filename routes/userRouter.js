var express = require('express');
const { verifyToken } = require("../middlewares/verifyToken");
const { register, changepassword, login, deleteaccount } = require('../Controllers/user.controller');
var router = express.Router();
var User = require('../models/user')

router.post('/changepassword',verifyToken,changepassword)
router.post('/delete',verifyToken,deleteaccount)
router.post('/register',register)
router.post('/login',login)
module.exports = router;