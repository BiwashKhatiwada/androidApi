const express = require('express');
const router = express.Router();
const checkAuth=require('../middleware/check-auth');
const mongoose = require('mongoose');
const SubCategory = require('../models/subCategory');

router.get('/',(req,res,next) => {
    SubCategory.find()
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

router.post('/',(req,res,next) => {
    const subcategory = new SubCategory({
        _id: new mongoose.Types.ObjectId(),
         _catId: req.body.catId,
         _userId:req.body.userId,
         _subCatName:req.body.subCat,
         _locationName:req.body.location,
         _longitude:req.body.longitude,
         _lattitude:req.body.lattitude,
         _description:req.body.description

    });
    subcategory.save().then(result => {
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

router.get('/:subcatId', (req,res,next) => {
       const id = req.params.subcatId;
       SubCategory.find({_id:id})
       .exec()
       .then(doc => {
           if(doc) {
            res.status(200).json(doc);
           }else{
               res.status(404).json({
                   message: 'No sub category found'
               });
           }
       }).catch(err => {
           res.status(500).json({error:err});
       });
});


router.patch('/:vehId', checkAuth,(req,res,next) => {
    const id = req.params.vehId;
    const updateOps = {};
    for (const key of Object.keys(req.body)) {
        updateOps[key]=req.body[key];
      }
    
    SubCategory.update({_id: id}, {$set: updateOps})
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

router.delete('/:vehicleId', checkAuth,(req,res,next) => {
    const id = req.params.vehicleId;
    SubCategory.remove({_id: id})
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

router.post('/getSubCat', (req,res,next) => {
    const id = req.body._catId;
    const longi=req.body._longi
    SubCategory.find({_catId:id})
    // ,"_longitude": { $gt: 85.3414918, $lt: 85.3414920 }
    .exec()
    .then(doc => {
        if(doc) {
         res.status(200).json(doc);
        }else{
            res.status(404).json({
                message: 'No sub category found'
            });
        }
    }).catch(err => {
        res.status(500).json({error:err});
    });
});

module.exports = router;