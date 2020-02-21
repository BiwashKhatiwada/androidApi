const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth=require('../middleware/check-auth');
const Product = require('../models/product');


router.get('/',(req,res,next) => {
    Product.find()
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
    const product = new Product({
        id: new mongoose.Types.ObjectId(),
        _subCatId: req.body.subCatId,
        _productName:req.body.productName,
        _productPrice:req.body.productPrice,
        _productImage:req.bidy.productImage
    });
    product.save().then(result => {
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

router.get('/:productId',(req,res,next) => {
       const id = req.params.productId;
       Product.find({_subCatId:id})
       .exec()
       .then(doc => {
           if(doc) {
            res.status(200).json(doc);
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



router.patch('/:staffId', checkAuth,(req,res,next) => {
    const id = req.params.staffId;
    const updateOps = {};
    for (const key of Object.keys(req.body)) {
        updateOps[key]=req.body[key];
      }
    
    Product.update({_id: id}, {$set: updateOps})
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

router.delete('/:staffId', checkAuth,(req,res,next) => {
    const id = req.params.staffId;
    Product.deleteOne({_id: id})
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


router.post('/getProductLimit', (req,res,next) => {
    const id = req.body.product;
    Product.find({_subCatId:id})
    .limit(3)
    .exec()
    
    .then(doc => {
        if(doc) {
           // console.log(JSON(doc));
         res.status(200).json(doc);
        }else{
            res.status(404).json({
                message: 'No data found'
            });
        }
    }).catch(err => {
        res.status(500).json({error:err});
    });
});

router.post('/getProductUnlimit', (req,res,next) => {
    const id = req.body.product;
    Product.find({_subCatId:id})
    .exec()
    
    .then(doc => {
        if(doc) {
           // console.log(JSON(doc));
         res.status(200).json(doc);
        }else{
            res.status(404).json({
                message: 'No data found'
            });
        }
    }).catch(err => {
        res.status(500).json({error:err});
    });
});

module.exports = router;