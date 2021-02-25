const router = require('express').Router();
const authenticate = require('../middleware/authenticate');

router.post('/private',authenticate,(req,res) => {
    let obj={
        messgae:"A priavet route",
        secrect:"YOU may PASS",
        _id: req._id
    };
    res.status(200).send(obj);
});

module.exports = router;