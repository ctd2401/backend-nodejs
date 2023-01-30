var express = require('express');
const { register, changepassword } = require('../Controllers/user.controller');
var router = express.Router();
var User = require('../models/user')

router.post('/changepassword',changepassword)
router.post('/register', register)
    
module.exports = router;