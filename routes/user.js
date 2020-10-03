var { User } =  require('../models/user');


const express = require('express');
const {mongoose} = require('../connect/mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');







//admiiiin
router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((err, registeredUser) => {
      if (err) {
        console.log(err)
      } else {
        let payload = {subject: registeredUser._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
    })
  });
  
  router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({email: userData.email}, (err, user) => {
      if (err) {
        console.log(err)
      } else {
        if (!user) {
          res.status(401).send('Invalid Email')
        } else
        if ( user.password !== userData.password) {
          res.status(401).send('Invalid Password')
        } else {
          let payload = {subject: user._id}
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({token})
        }
      }
    })
  });
  
  
  router.post('/change/:pass', (req, res) => {
    let pass  = req.params.pass;
    let userData = req.body;
  
    console.log(userData);
    User.findOne({email: userData.email}, (err, user) => {
      if (err) {
        console.log(err)
      } else {
        if (!user) {
          res.status(401).send('Invalid Email')
        } else
        if ( user.password !== userData.password) {
          res.status(401).send('Invalid Password')
        } else {
          userData.password = pass;
            User.findOneAndUpdate(
              { email: req.body.email },
              userData,
              { new: true, upsert: true, setDefaultsOnInsert: true },
              function(err, userUpdate) {
                  return res.json(userUpdate);
              }
          );
        }
      }
    })
  })


  
  




module.exports = router;