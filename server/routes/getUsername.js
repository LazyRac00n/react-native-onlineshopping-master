const router = require('express').Router();
const authenticate = require('../middleware/authenticate');
const User = require("../db/models/user-model");
router.post('/getUsername',authenticate,(req,res)=>{
    User.findOne({_id:req._id}).then((user)=>{
        return res.status(200).send(user.username);
    });
});

module.exports = router;