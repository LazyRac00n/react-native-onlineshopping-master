const router = require('express').Router();
const authenticate = require('../middleware/authenticate');
const User = require("../db/models/user-model");
router.post('/addItem',authenticate,(req,res)=>{
    User.findOneAndUpdate({_id:req._id},{$set: {item : 'MG gundam'}},{useFindAndModify: false},(err, doc)=>{
        if(err){
            console.log(err);
        }
        console.log(doc);
        res.status(200).send(doc);
    })
    
});

module.exports = router;