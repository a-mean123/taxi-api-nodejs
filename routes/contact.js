const express = require('express');
const router = express.Router();
const {Contact} = require('../models/contact');

const {mongoose} = require('../connect/mongoose');

router.post('/addcontact' ,(req, res)=>{

    con = req.body;
    var contact = new Contact(con);
    contact.save().then(
        (savedContact)=>{
            res.send(savedContact);
        },
        (err)=>{
            res.send(err);
        }
    );

});


router.get('/getcontact' , (req, res)=>{
   
    Contact.find({}).then(
        (contacts)=>{
            res.send(contacts);
        },
        (err)=>{
            res.send(err);
        }
    );
})





router.get('/getcontactbyid/:id', (req, res)=>{

        var id = req.params.id;
        Contact.findOne({_id: id}).then(
            (con)=>{
                res.send(con);
            }, 
            (err)=>{
                res.send(err);
            }
        );

});

router.delete('/deletecontact/:id' , (req, res)=>{
   
    var id = req.params.id;
    Contact.findByIdAndDelete({_id:id}).then(
        (deletedContact)=>{
            res.send(deletedContact);
        },
        (err)=>{
            res.send(err);
        }
    );

});


router.put('/updatecontact/:id' , (req, res)=>{
    
    var id= req.params.id;
    n = req.body.name;
    e = req.body.email;
    s = req.body.subject;
    m = req.body.message;

    Contact.findByIdAndUpdate({_id:id}, {$set: {name: n, email : e, subject: s, message: m}}).then(
        (updatedContact)=>{
            res.send(updatedContact);
        },
        (err)=>{
            res.send(err);
        }
    );
    


});




module.exports = router;