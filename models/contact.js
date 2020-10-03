const mongoose = require('mongoose');


var Contact = mongoose.model('Contact' , {

    name: String,
    email: String,
    subject: String,
    message: String


});


module.exports = {Contact};