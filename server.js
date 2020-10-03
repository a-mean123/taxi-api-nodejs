
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {mongoose} = require('./connect/mongoose');
const contactApi = require('./routes/contact');
const reservationApi = require('./routes/reservation');



const userApi = require('./routes/user');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());


app.use('/contact' , contactApi);
app.use('/reservation' , reservationApi);


app.use('/user', userApi);








app.listen(3000, ()=>{
    console.log('server work!!!');
});