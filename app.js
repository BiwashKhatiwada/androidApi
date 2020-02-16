const express = require('express');
const app = express()
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('./database/dbconnection');
const cors = require('cors');
app.use(cors());
const productRouters=require('./api/routes/product');
const categoryRouters=require('./api/routes/category');
const subCategoryRouters=require('./api/routes/subCategory');
const productReview=require('./api/routes/productReview');
const adminsRouters=require('./api/routes/register');
const expenseRouters=require('./api/routes/expensePackage');


app.use('/uploads',express.static(__dirname + '/uploads/images'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/products', productRouters);
app.use('/category', categoryRouters);
app.use('/subCategory', subCategoryRouters);
app.use('/productReview', productReview);
app.use('/users', adminsRouters);
app.use('/package', expenseRouters);


app.use((req,res,next) => {
    const error = new Error('No results');
    error.status= 404;
    next(error);
});

app.use((error, req,res,next) => {
        res.status(error.status || 500);
        res.json({
            error: {
                message: error.message
            }
        });
});
module.exports = app;