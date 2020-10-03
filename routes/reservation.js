const express = require('express');
const router = express.Router();
const {Reservation} = require('../models/reservation');

const {mongoose} = require('../connect/mongoose');

router.post('/addreservation' ,(req, res)=>{

    con = req.body;
    var reservation = new Reservation(con);
    reservation.save().then(
        (savedreservation)=>{
            res.send(savedreservation);
        },
        (err)=>{
            res.send(err);
        }
    );

});


router.get('/getreservation' , (req, res)=>{
   
    Reservation.find({}).then(
        (reservations)=>{
            res.send(reservations);
        },
        (err)=>{
            res.send(err);
        }
    );
})


router.get('/getreservationbyid/:id', (req, res)=>{

        var id = req.params.id;
        Reservation.findOne({_id: id}).then(
            (con)=>{
                res.send(con);
            }, 
            (err)=>{
                res.send(err);
            }
        );

});

router.delete('/deletereservation/:id' , (req, res)=>{
   
    var id = req.params.id;
    Reservation.findByIdAndDelete({_id:id}).then(
        (deletedreservation)=>{
            res.send(deletedreservation);
        },
        (err)=>{
            res.send(err);
        }
    );

});


router.put('/acceptreservation/:id' , (req, res)=>{
    
    var id= req.params.id;
  

    Reservation.findByIdAndUpdate({_id:id}, {$set: {etat: '1'}}).then(
        (updatedreservation)=>{
            res.send(updatedreservation);
        },
        (err)=>{
            res.send(err);
        }
    );
    


});

router.put('/refusereservation/:id' , (req, res)=>{
    
    var id= req.params.id;
  

    Reservation.findByIdAndUpdate({_id:id}, {$set: {etat: '-1'}}).then(
        (updatedreservation)=>{
            res.send(updatedreservation);
        },
        (err)=>{
            res.send(err);
        }
    );
    


});



module.exports = router;