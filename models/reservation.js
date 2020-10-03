var mongoose = require('mongoose');

var Reservation = mongoose.model('Reservation', {


 email:{
     type: String
 },
 phone:{
    type: String
},
name: {
    type: String
},

date: {
    type: String
},
time: {
    type: String
},

depart: {
    type: String
},
destination: {
    type: String
},
nombre: {
    type: Number
},
postal: {
    type: String
},
etat: {
    type: String
}



});

module.exports = {Reservation};