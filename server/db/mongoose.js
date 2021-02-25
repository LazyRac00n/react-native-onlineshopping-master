const mongoose = require('mongoose');
const {databasePassword, databaseUsername} = require('../config');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://guchen:135246@cluster0-p7f8i.mongodb.net/test?retryWrites=true&w=majority',
{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true }).then(()=>{
    console.log('DB connected');
}).catch(err => console.log(err));

module.exports = mongoose;