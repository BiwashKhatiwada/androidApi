const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth=require('../middleware/check-auth');
const ProductReview = require('../models/productReview');


router.get('/',(req,res,next) => {
    ProductReview.find()
            .exec()
            .then(docs =>{
                console.log(docs);
                res.status(200).json(docs);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error:err 
                });
            });
});


router.post('/',(req,res,next) => {
    const productReview = new ProductReview({
        id: new mongoose.Types.ObjectId(),
        _productId: req.body.productId,
        _userId:req.body.userId,
        _rating:req.body.rating,
        _comment:req.body.comment
        
    });
    productReview.save().then(result => {
            res.status(201).json({
                status:'success',
                created: result
        });
    })
    .catch(err => {
        console.log(err);
         res.status(500).json({
             error: err
         });  
    });
});

router.post('/productReviews',(req,res,next) => {
       const id = req.body.productId;
       ProductReview.find({_productId:id})
       .populate("_userId")
       .select("_comment _rating")
       .sort({_id: -1})
       .exec()
       .then(doc => {
           if(doc) {
               var data=JSON.stringify(doc);
               var result=[];
               doc.forEach(d => {
                  var dt={};
                  dt._fullName=d['_userId']._fullName;
                  dt._rating=d._rating;
                  dt._comment=d._comment;
                  dt._userImage=d['_userId']._userImage
                   result.push(dt);
               });              
            res.status(200).json(result);
           }else{
               res.status(404).json({
                   message: 'No data found'
               });
           }
           
       }).catch(err => {
           console.log(err);
           res.status(500).json({error:err});
       });
});

module.exports = router;