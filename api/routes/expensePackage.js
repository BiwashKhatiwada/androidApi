const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Expense = require('../models/expensePackage');
var fs = require('fs');
var multer = require('multer');
var path = require('path')


router.get('/', (req,res,next) => {
    Expense.find()
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
    const expense = new Expense(
        {
        _id: new mongoose.Types.ObjectId(),
        _packageName: req.body._packageName,
        _userId:req.body._userId 
    });
    expense.save().then(result => {
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

router.post('/getPackage',(req,res,next) => {
       Expense.find({_userId:req.body.userId}).exec()
       .then(doc => {
           if(doc) {
               console.log(doc);
            res.status(200).json(doc);
           }else{
               res.status(404).json({
                   message: 'No expense found'
               });
           }
       }).catch(err => {
           res.status(500).json({error:err});
       });
});


router.delete('/:catId',(req,res,next) => {
    const id = req.params.catId;
    Expense.remove({_id: id})
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