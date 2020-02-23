const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Category = require('../models/category');
const checkAuth=require('../middleware/check-auth');
var fs = require('fs');
var multer = require('multer');
var path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
  })
  
  var upload = multer({ storage: storage });


router.get('/', (req,res,next) => {
    Category.find()
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


router.post('/', upload.single("photo"),(req,res,next) => {
    const category = new Category(
        {
        _id: new mongoose.Types.ObjectId(),
         _catName: req.body.catName,
         _catImage:req.file.filename

    });
    category.save().then(result => {
            // console.log(result);
            res.status(201).json({
                status:'Success',
                createdProduct: result
        });
    })
    .catch(err => {
        console.log(err);
         res.status(500).json({
             error: err
         });  
    });
});




router.get('/:catId', checkAuth,(req,res,next) => {
         req.params.catId;
       const id = req.params.catId;
       Category.find({_id:id}).exec()
       .then(doc => {
           if(doc) {
            res.status(200).json(doc);
           }else{
               res.status(404).json({
                   message: 'No category found'
               });
           }
       }).catch(err => {
           res.status(500).json({error:err});
       });
});

router.patch('/:catId', checkAuth,(req,res,next) => {
    const id = req.params.catId;
    const updateOps = {};
    for (const key of Object.keys(req.body)) {
        updateOps[key]=req.body[key];
      }
    Category.updateOne({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:catId', checkAuth,(req,res,next) => {
    const id = req.params.catId;
    Category.remove({_id: id})
        .exec()
        .then(result => {
                res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;