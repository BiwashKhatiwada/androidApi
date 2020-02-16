const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Register = require('../models/register');
var bcrypt = require('bcryptjs');
var fs = require('fs');
var multer = require('multer');
var path = require('path')
const jwt = require('jsonwebtoken');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
  })
  
  var upload = multer({ storage: storage });

router.get('/',(req,res,next) => {
    Register.find()
            .exec()
            .then(docs =>{
                res.status(200).json(docs);
            })
            .catch(err => {
                res.status(500).json({
                    error:err 
                });
            });
});

router.post('/getProfile', (req,res,next) => {
    const id = req.body.userId;
    Register.find({_id:id})
    .select("_fullName _userEmail _userPhone _userImage")
    .exec()
    .then(doc => {
        if(doc) {
            result={};
            result._fullName=doc[0]._fullName;
            result._userPhone=doc[0]._userPhone;
            result._userEmail=doc[0]._userEmail;
         res.status(200).json(result);
        }else{
            res.status(404).json({
                message: 'No users found'
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
  });


router.post('/',upload.single("profilePicture"),(req,res,next) => {
    var image="";
    if(req.file){
        var image=req.file.filename;
    }
    bcrypt.genSalt(12, function(err, salt) {
        bcrypt.hash(req.body._userPassword, salt, function(err, hash) {
        const register = new Register({
         id: new mongoose.Types.ObjectId(),
         _fullName:req.body._fullName,
        _userEmail: req.body._userEmail,
        _userPassword:hash,
        _userPhone:req.body._userPhone,
        _userType:req.body._userType,
        _userImage:image
    });
    register.save().then(result => {
            var data=result.toJSON();
           delete data._userPassword;
            res.status(201).json({
                status:'success',
                created:data
        });
    })
    .catch(err => {
        console.log(err);
         res.status(500).json({
             error: err
         });  
    });
});
});
});

router.get('/:userId', (req,res,next) => {
         req.params.userId;
       const id = req.params.userId;
       Register.find({_id:id}).exec()
       .then(doc => {
           if(doc) {
            res.status(200).json(doc);
           }else{
               res.status(404).json({
                   message: 'No users found'
               });
           }
       }).catch(err => {
           console.log(err);
           res.status(500).json({error:err});
       });
});

router.post('/login', (req,res,next) => {
    Register.findOne({_userEmail: req.body.email}).exec()
    .then(doc => {
        if(doc) {
         bcrypt.compare(req.body.password, doc._userPassword, function(err, ress) {
             if(ress){
                
                 var result = doc.toJSON();
                 delete result._userPassword;
                 var token = jwt.sign({ email: result._userEmail,id:result._id}, 'secretkey');
                 result.status=true;
                 Register.updateOne({_userEmail:req.params.email},{$set:{_token:token}})
                .exec()
                 return res.send(result);
             }
             else {
                 res.send({
                     message: 'error'
                 });
             }
          });
        }else{
         res.send({
             message: 'nouser'
         });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});

router.post('/getProfile', (req,res,next) => {
  const id = req.body.userId;
  console.log(id);
  Register.find({_id:id})
   .select("_fullName _userEmail _userPhone _userImage")
  .exec()
  .then(doc => {
      if(doc) {
          
       res.status(200).json(doc);
      }else{
          res.status(404).json({
              message: 'No users found'
          });
      }
  }).catch(err => {
      console.log(err);
      res.status(500).json({error:err});
  });
});

router.patch('/updateProfile',upload.single("_userImage"),(req,res,next) => {
    var id=req.body._userId;
    const updateOps = {};
    if(req.file){
     updateOps._userImage=req.file.filename;
    }
    for (const key of Object.keys(req.body)) {
        updateOps[key]=req.body[key];
      }
    Register.updateOne({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        res.status(200).json({
            status: 'updated'
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});


router.delete('/:userId', (req,res,next) => {
    const id = req.params.userId;
    Register.deleteOne({_id: id})
        .exec()
        .then(result => {
                res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;