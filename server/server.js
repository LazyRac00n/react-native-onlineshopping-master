const express = require('express');
const app = express();
const mongoose = require('./db/mongoose');
const userRoutes = require('./routes/user-routes');
const bodyParser = require('body-parser');
const private = require('./routes/private');
const addItem = require('./routes/addItem');
const getUsername = require('./routes/getUsername');
app.use(bodyParser.json());
app.get('/',(req, res)=>{
    res.send('welcome');
});

app.use('/user',userRoutes);
app.use('/private', private);
app.use('/addItem',addItem);
app.use('/getUsername',getUsername);
const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`server started on port ${PORT}`);
});