const mongoose = require('mongoose');
const category = mongoose.Schema({
    _catName: {data: Buffer,type:String,unique:true},
    _catImage:String

});

module.exports = mongoose.model('tbl_category', category);