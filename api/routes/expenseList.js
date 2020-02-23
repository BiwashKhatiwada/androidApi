const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Expense = require('../models/expenseList');

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
    console.log(req.body._price);
    const expense = new Expense(
        {
        _id: new mongoose.Types.ObjectId(),
        _expenseName:req.body._expenseName,
        _price: req.body._price,
        _expenseId:req.body._expenseId,
        _date:req.body._date
    });
    expense.save().then(result => {
            console.log(result);
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

router.post('/getExpense',(req,res,next) => {

       Expense.find({_expenseId:req.body.expense})
       .sort({_id:-1})
       .exec()
       .then(doc => {
           if(doc) {
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