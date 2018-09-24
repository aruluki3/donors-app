var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Admin = require('../models/admin');
var Camp = require('../models/camp');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/loginapp');
var db = mongoose.connection;

router.get('/admin', function(req, res){
  res.render('admin');
});

router.post('/adminlogin', function(req, res){
  console.log("varuthhhu");
  Admin.getAdminbymail(req.body.mail, (err, admin)=> {
    if(err) throw err;
    if(admin){
      res.redirect('/admins/hma');
    }
    else {
      console.log("Admin not found");
    }
  })
});

router.get('/create', (req, res)=>{
  res.render('creator');
})

router.get('/hma', (req, res)=>{
  res.render('homeadmin');
});

router.post('/adminception', (req, res)=>{
  var newAdmin = new Admin();

  newAdmin.mail = req.body.mail;
  newAdmin.password = req.body.password;

  Admin.createAdmin(newAdmin, (err, admin) => {
    if(err) throw err;
    console.log(admin);
  });
  res.redirect('/admins/admin');
});

router.post('/addcamp', (req, res)=>{
  var newCamp = new Camp();

  newCamp.name = req.body.campName;
  newCamp.address = req.body.campAddress;
  newCamp.sponsor.name = req.body.sponname;
  newCamp.sponsor.number = req.body.sponnumber;
  newCamp.date = req.body.spondate;
  newCamp.time = req.body.spontime;

  Camp.createCamp(newCamp, (err, camp)=>{
    if(err) throw err;
  });
  res.redirect('/admins/hma');
})

router.get('/getallcamps', (req, res)=>{
  db.collection('camps').find({}).toArray((err, camp)=>{
    if(err) throw err;
    if(!camp){
      console.log("no camps details avaialble");
    }
    else{
      res.send(camp);
    }
  });
})

router.get('/viewcamps', (req, res)=>{
  res.render('viewcamp');
});

router.put('/', (req, res)=>{

});

module.exports = router;
